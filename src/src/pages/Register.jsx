import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";
import { toast } from "react-toastify";
import AbandonWord from "../utils/AbandonWord";
import { TbEyeCancel, TbEyeCheck } from "react-icons/tb";

const Register = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await Axios.post("/users/register", data);
      if (res.status === 201) {
        setUser(res.data.user || res.data);
        navigate("/login");
        toast.success("🎉 Registered successfully.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      const msg = error.response?.data?.errors
        ? JSON.stringify(error.response.data.errors)
        : error.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "Poppins, sans-serif",
    }}>
      {/* Left panel */}
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
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"320px", height:"320px", borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>

        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"28px", maxWidth:"360px", textAlign:"center" }}>
          <div style={{ animation: "rh-float 3s ease-in-out infinite" }}>
            <svg width="64" height="76" viewBox="0 0 72 84" fill="none">
              <path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <path d="M36 16C36 16 16 36 16 52C16 64.15 24.95 74 36 74C47.05 74 56 64.15 56 52C56 36 36 16 36 16Z" fill="rgba(255,255,255,0.5)"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"44px", fontWeight:700, color:"#fff", letterSpacing:"0.06em", margin:0, lineHeight:1 }}>REDHOPE</h1>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px", marginTop:"8px", letterSpacing:"0.1em", textTransform:"uppercase" }}>Join the lifesaving network</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px", width:"100%" }}>
            {[
              ["🩸", "Donate blood and save lives"],
              ["📍", "Find donors near you instantly"],
              ["🏥", "Connect with hospitals & patients"],
              ["🔔", "Get emergency alerts in real-time"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display:"flex", alignItems:"center", gap:"12px", background:"rgba(255,255,255,0.1)", borderRadius:"10px", padding:"12px 16px", border:"1px solid rgba(255,255,255,0.12)", textAlign:"left" }}>
                <span style={{ fontSize:"20px" }}>{icon}</span>
                <span style={{ color:"rgba(255,255,255,0.88)", fontSize:"14px" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
        background: "#fff",
        overflowY: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily:"oswald,sans-serif", fontSize:"30px", fontWeight:700, color:"var(--ink)", margin:0 }}>Create your account</h2>
            <p style={{ color:"var(--ink-40)", fontSize:"14px", marginTop:"8px" }}>Become a lifesaver today — it's free</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
            <div className="rh-field">
              <label className="rh-label">Full name</label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 6, message: "Name must be at least 6 characters" },
                  pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters" },
                  validate: (value) => {
                    const lower = value.toLowerCase();
                    return AbandonWord.some(b => lower.includes(b)) ? "Name contains restricted words!" : true;
                  },
                })}
                onBlur={e => setValue("name", e.target.value.trim(), { shouldValidate: true })}
                className="rh-input"
                placeholder="Your full name"
                type="text"
              />
              {errors.name && <p className="rh-error">{errors.name.message}</p>}
            </div>

            <div className="rh-field">
              <label className="rh-label">Email address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                })}
                onBlur={e => setValue("email", e.target.value.trim(), { shouldValidate: true })}
                className="rh-input"
                placeholder="you@example.com"
                type="email"
              />
              {errors.email && <p className="rh-error">{errors.email.message}</p>}
            </div>

            <div className="rh-field">
              <label className="rh-label">Password</label>
              <div style={{ position:"relative" }}>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className="rh-input"
                  placeholder="Create a password"
                  type={show ? "password" : "text"}
                  style={{ paddingRight: "48px" }}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--ink-40)", display:"flex", alignItems:"center", padding:0 }}
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
              {loading ? <><span className="rh-spinner" style={{width:18,height:18,borderWidth:2}}></span> Creating account...</> : "Create account"}
            </button>

            <p style={{ fontSize:"12px", color:"var(--ink-40)", textAlign:"center", lineHeight:1.6 }}>
              By signing up, you agree to our{" "}
              <span style={{ color:"var(--crimson)", cursor:"pointer", fontWeight:500 }}>Terms of Service</span>
              {" "}and{" "}
              <span style={{ color:"var(--crimson)", cursor:"pointer", fontWeight:500 }}>Privacy Policy</span>
            </p>
          </form>

          <div style={{ textAlign:"center", marginTop:"28px" }}>
            <p style={{ color:"var(--ink-40)", fontSize:"14px" }}>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                style={{ color:"var(--crimson)", fontWeight:600, background:"none", border:"none", cursor:"pointer", fontSize:"14px", padding:0 }}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`.auth-left-panel { display: flex !important; } @media(max-width:768px){ .auth-left-panel { display: none !important; } }`}</style>
    </div>
  );
};

export default Register;
