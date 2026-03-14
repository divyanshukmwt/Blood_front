import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TbEyeCancel, TbEyeCheck } from "react-icons/tb";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const res = await Axios.post("/users/login", { email, password });
      if (res.status === 200) {
        const payload = res.data.user || res.data;
        setUser(payload);
        if (res.data.token) {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("token", res.data.token);
        }
        navigate("/");
        toast.success("🎉 Login successful.");
      } else {
        toast.error("Something went wrong!");
      }
    } catch {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "var(--white)",
      fontFamily: "Poppins, sans-serif",
    }}>
      {/* Left panel — brand */}
      <div style={{
        flex: "0 0 45%",
        background: "linear-gradient(145deg, var(--crimson-dark) 0%, var(--crimson) 60%, #E8192E 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px",
        position: "relative",
        overflow: "hidden",
      }} className="auth-left-panel">
        {/* Decorative circles */}
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"320px", height:"320px", borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"500px", height:"500px", borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>

        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"32px", maxWidth:"360px", textAlign:"center" }}>
          {/* Blood drop icon */}
          <div style={{ animation: "rh-float 3s ease-in-out infinite" }}>
            <svg width="72" height="84" viewBox="0 0 72 84" fill="none">
              <path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <path d="M36 16C36 16 16 36 16 52C16 64.15 24.95 74 36 74C47.05 74 56 64.15 56 52C56 36 36 16 36 16Z" fill="rgba(255,255,255,0.5)"/>
            </svg>
          </div>

          <div>
            <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"48px", fontWeight:700, color:"#fff", letterSpacing:"0.06em", margin:0, lineHeight:1 }}>
              REDHOPE
            </h1>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"14px", marginTop:"8px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              Blood Donation Platform
            </p>
          </div>

          <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:"16px", padding:"24px", border:"1px solid rgba(255,255,255,0.15)" }}>
            <p style={{ color:"rgba(255,255,255,0.9)", fontSize:"15px", lineHeight:1.7, margin:0 }}>
              "Every 2 seconds, someone in India needs blood. Your donation can save up to 3 lives."
            </p>
          </div>

          <div style={{ display:"flex", gap:"32px" }}>
            {[["4.2L+","Donations"],["28K+","Lives Saved"],["12K+","Donors"]].map(([num,label]) => (
              <div key={label} style={{ textAlign:"center" }}>
                <div style={{ color:"#fff", fontFamily:"oswald,sans-serif", fontSize:"22px", fontWeight:700 }}>{num}</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:"11px", marginTop:"2px", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
        background: "#fff",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily:"oswald,sans-serif", fontSize:"32px", fontWeight:700, color:"var(--ink)", margin:0, letterSpacing:"0.02em" }}>
              Welcome back
            </h2>
            <p style={{ color:"var(--ink-40)", fontSize:"15px", marginTop:"8px" }}>
              Sign in to your RedHope account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <div className="rh-field">
              <label className="rh-label">Email address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                })}
                className="rh-input"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
              {errors.email && <p className="rh-error">{errors.email.message}</p>}
            </div>

            <div className="rh-field">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                <label className="rh-label" style={{ margin:0 }}>Password</label>
                <Link to="/forget-password" style={{ fontSize:"13px", color:"var(--crimson)", textDecoration:"none", fontWeight:500 }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position:"relative" }}>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className="rh-input"
                  placeholder="Enter your password"
                  type={show ? "password" : "text"}
                  autoComplete="current-password"
                  style={{ paddingRight: "48px" }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--ink-40)", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}
                >
                  {show ? <TbEyeCancel size={18}/> : <TbEyeCheck size={18} style={{ color:"var(--success)" }}/>}
                </button>
              </div>
              {errors.password && <p className="rh-error">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rh-btn rh-btn-primary rh-btn-lg"
              style={{ width:"100%", marginTop:"8px" }}
            >
              {loading ? (
                <><span className="rh-spinner" style={{ width:18,height:18,borderWidth:2 }}></span> Signing in...</>
              ) : "Sign in"}
            </button>
          </form>

          <div style={{ textAlign:"center", marginTop:"32px" }}>
            <p style={{ color:"var(--ink-40)", fontSize:"14px" }}>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                style={{ color:"var(--crimson)", fontWeight:600, background:"none", border:"none", cursor:"pointer", fontSize:"14px", padding:0 }}
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
