import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Droplets, RotateCcw } from "lucide-react";

const Otp = () => {
  const { user } = useContext(UserContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    inputsRef.current[0]?.focus();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);
    await Axios.post("/users/resendOtp", { email: user.email });
  };

  const otpValue = otp.join("");

  const otpSubmiter = async (e) => {
    e.preventDefault();
    try {
      if (otpValue.length === 4) {
        const res = await Axios.post("/users/otp-verify", { email: user.email, otpValue });
        localStorage.setItem("userToken", res.data.token);
        navigate("/users/profile");
        toast.success("Login successful!");
      } else {
        toast.error("OTP must be 4 digits.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ash)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "white", borderRadius: "24px", padding: "48px 40px", boxShadow: "var(--card-shadow)", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--crimson)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Droplets size={14} color="white" strokeWidth={2} />
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.2rem" }}>
            Red<span style={{ color: "var(--crimson)" }}>Hope</span>
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.02em", marginBottom: "8px" }}>
            Verify your email
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            We sent a 4-digit code to your inbox. Check your spam folder if you don't see it.
          </p>
        </div>

        {/* OTP inputs */}
        <form onSubmit={otpSubmiter} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                style={{
                  width: 56, height: 64,
                  borderRadius: "12px",
                  border: `2px solid ${digit ? "var(--crimson)" : "var(--border)"}`,
                  background: digit ? "var(--crimson-pale)" : "var(--ash)",
                  fontSize: "1.5rem", fontWeight: 700,
                  textAlign: "center", outline: "none",
                  fontFamily: "Syne, sans-serif",
                  transition: "all 0.15s",
                  color: "var(--ink)",
                }}
                onFocus={e => e.target.style.borderColor = "var(--crimson)"}
                onBlur={e => e.target.style.borderColor = digit ? "var(--crimson)" : "var(--border)"}
              />
            ))}
          </div>

          <button type="submit" style={{
            width: "100%", padding: "14px", borderRadius: "10px",
            background: "var(--crimson)", color: "white", border: "none", cursor: "pointer",
            fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "0.95rem",
            transition: "all 0.2s",
            boxShadow: "0 2px 12px rgba(192,21,42,0.3)",
          }}>
            Verify OTP
          </button>
        </form>

        {/* Timer / Resend */}
        {timer > 0 ? (
          <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
            Resend code in <span style={{ color: "var(--crimson)", fontWeight: 700 }}>{timer}s</span>
          </p>
        ) : (
          <button onClick={handleResend} style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "10px",
            background: "var(--ash)", border: "1px solid var(--border)",
            color: "var(--ink)", cursor: "pointer",
            fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "0.875rem",
            transition: "all 0.2s",
          }}>
            <RotateCcw size={14} /> Resend Code
          </button>
        )}
      </div>
    </div>
  );
};

export default Otp;
