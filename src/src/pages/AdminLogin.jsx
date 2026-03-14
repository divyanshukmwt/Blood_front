import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AdminContext } from "../context/admin.context";
import AdminAxios from "../config/AdminAxios";
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await AdminAxios.post("/admin/login", { email, password });
      setAdmin(res.data.admin);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
      toast.success("🎉 Login successful.");
    } catch {
      toast.error("❌ Invalid credentials. Try again.");
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--ink)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:"Poppins,sans-serif", position:"relative", overflow:"hidden" }}>
      {/* Background decoration */}
      <div style={{ position:"absolute", top:"-100px", right:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(192,21,42,0.08)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-100px", left:"-100px", width:"300px", height:"300px", borderRadius:"50%", background:"rgba(192,21,42,0.05)", pointerEvents:"none" }}/>

      <div style={{ width:"100%", maxWidth:"400px", position:"relative", zIndex:1 }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"36px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"8px 20px", marginBottom:"24px" }}>
            <div style={{ width:24, height:24, background:"var(--crimson)", borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="13" height="15" viewBox="0 0 72 84" fill="none"><path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="white"/></svg>
            </div>
            <span style={{ fontFamily:"oswald,sans-serif", fontSize:"16px", fontWeight:700, color:"rgba(255,255,255,0.9)", letterSpacing:"0.06em" }}>REDHOPE ADMIN</span>
          </div>
          <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"34px", fontWeight:700, color:"#fff", margin:0, letterSpacing:"0.02em" }}>Admin Portal</h1>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"14px", marginTop:"8px" }}>Restricted access — authorized personnel only</p>
        </div>

        {/* Form card */}
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"32px", backdropFilter:"blur(10px)" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <div className="rh-field">
              <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"6px" }}>Admin Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
                style={{
                  width:"100%", padding:"13px 16px", fontFamily:"Poppins,sans-serif", fontSize:"15px",
                  color:"#fff", background:"rgba(255,255,255,0.07)", border:"1.5px solid rgba(255,255,255,0.12)",
                  borderRadius:"10px", outline:"none", transition:"all 200ms ease",
                }}
                onFocus={e => { e.target.style.borderColor = "var(--crimson)"; e.target.style.boxShadow = "0 0 0 3px rgba(192,21,42,0.2)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                placeholder="admin@redhope.com"
                type="email"
                autoComplete="email"
              />
              {errors.email && <p style={{ color:"var(--crimson)", fontSize:"12px", marginTop:"5px" }}>{errors.email.message}</p>}
            </div>

            <div className="rh-field">
              <label style={{ display:"block", fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"6px" }}>Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                style={{
                  width:"100%", padding:"13px 16px", fontFamily:"Poppins,sans-serif", fontSize:"15px",
                  color:"#fff", background:"rgba(255,255,255,0.07)", border:"1.5px solid rgba(255,255,255,0.12)",
                  borderRadius:"10px", outline:"none", transition:"all 200ms ease",
                }}
                onFocus={e => { e.target.style.borderColor = "var(--crimson)"; e.target.style.boxShadow = "0 0 0 3px rgba(192,21,42,0.2)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                placeholder="Enter password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && <p style={{ color:"var(--crimson)", fontSize:"12px", marginTop:"5px" }}>{errors.password.message}</p>}
            </div>

            <button type="submit" className="rh-btn rh-btn-primary rh-btn-lg" style={{ width:"100%", marginTop:"8px" }}>
              Sign In to Admin
            </button>
          </form>
        </div>

        <div style={{ textAlign:"center", marginTop:"20px" }}>
          <button onClick={() => navigate("/")} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.35)", fontSize:"13px", cursor:"pointer" }}>
            ← Back to main site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
