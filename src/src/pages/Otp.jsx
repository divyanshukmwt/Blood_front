import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        toast.success("🎉 Verified successfully.");
      } else {
        toast.error("❌ OTP must be 4 digits.");
      }
    } catch {
      toast.error("❌ Something went wrong!");
    }
  };

  const progressDeg = ((60 - timer) / 60) * 360;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--ink-2)",
      fontFamily: "Poppins,sans-serif",
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: 52, height: 52, background: "var(--crimson)", borderRadius: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", boxShadow: "var(--shadow-crimson)" }}>
            <svg width="28" height="32" viewBox="0 0 72 84" fill="none"><path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="white"/></svg>
          </div>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "26px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Verify Your Email</h2>
          <p style={{ color: "var(--ink-40)", fontSize: "14px", marginTop: "6px", lineHeight: 1.6 }}>
            We sent a 4-digit code to your inbox.<br/>Check your spam folder if you don't see it.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid var(--ink-10)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
          <form onSubmit={otpSubmiter} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            {/* OTP inputs */}
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
                    border: `2px solid ${digit ? "var(--crimson)" : "var(--ink-10)"}`,
                    background: digit ? "var(--crimson-subtle)" : "var(--ink-2)",
                    fontSize: "24px",
                    fontWeight: 700,
                    fontFamily: "oswald,sans-serif",
                    textAlign: "center",
                    outline: "none",
                    color: "var(--ink)",
                    transition: "all 200ms ease",
                  }}
                  onFocus={e => { e.target.style.borderColor = "var(--crimson)"; e.target.style.boxShadow = "0 0 0 3px rgba(192,21,42,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = digit ? "var(--crimson)" : "var(--ink-10)"; e.target.style.boxShadow = "none"; }}
                />
              ))}
            </div>
            <input type="hidden" value={otpValue} />

            {/* Timer */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ position: "relative", width: 28, height: 28 }}>
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" r="11" fill="none" stroke="var(--ink-10)" strokeWidth="2.5"/>
                  <circle cx="14" cy="14" r="11" fill="none" stroke={timer > 15 ? "var(--success)" : "var(--crimson)"} strokeWidth="2.5"
                    strokeDasharray={`${2 * Math.PI * 11}`}
                    strokeDashoffset={`${2 * Math.PI * 11 * (timer / 60)}`}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", fontWeight: 700, color: timer > 15 ? "var(--success)" : "var(--crimson)" }}>{timer}</span>
              </div>
              <span style={{ fontSize: "13px", color: timer > 0 ? "var(--ink-40)" : "var(--crimson)", fontWeight: 500 }}>
                {timer > 0 ? `Resend available in ${timer}s` : "Code expired"}
              </span>
            </div>

            <button
              type="submit"
              className="rh-btn rh-btn-primary rh-btn-lg"
              style={{ width: "100%" }}
            >
              Verify OTP →
            </button>
          </form>

          {timer <= 0 && (
            <button
              onClick={handleResend}
              className="rh-btn rh-btn-ghost rh-btn-md"
              style={{ width: "100%", marginTop: "12px" }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;
