import Axios from '../config/Axois';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { TbEyeCancel, TbEyeCheck } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';

const STEPS = { EMAIL: 0, OTP: 1, PASSWORD: 2, DONE: 3 };

const ForgetPassword = () => {
  const navigate = useNavigate();
  const pass = useRef(null);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(STEPS.EMAIL);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const emailHandler = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) { toast.error("Enter a valid email."); return; }
    setLoading(true);
    try {
      toast.success("OTP sent! Check your inbox or spam.");
      await Axios.post("/users/forgetPass", { email });
      setStep(STEPS.OTP);
    } finally { setLoading(false); }
  };

  const otpHandler = (e) => {
    e.preventDefault();
    if (otp.length !== 4) { toast.error("OTP must be 4 digits."); return; }
    setStep(STEPS.PASSWORD);
  };

  const passwordHandler = async (e) => {
    e.preventDefault();
    if (!passregex.test(password)) {
      setErr("Min 8 chars, uppercase, lowercase, number & special character required.");
      return;
    }
    setLoading(true);
    try {
      const res = await Axios.post("/users/updatePassword", { email, otp, password });
      if (res.status === 200) {
        setErr("");
        toast.success("Password changed successfully.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 409) toast.info("Don't reuse your previous password.");
      else if (error.response?.status === 401) { setErr("Invalid or expired OTP."); }
      else setErr("Something went wrong. Try again.");
    } finally { setLoading(false); }
  };

  const stepLabels = ["Enter Email", "Verify OTP", "New Password"];

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--ink-2)", fontFamily:"Poppins,sans-serif", padding:"20px" }}>
      <div style={{ width:"100%", maxWidth:"440px" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ width:48, height:48, background:"var(--crimson)", borderRadius:"12px", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:"12px" }}>
            <svg width="26" height="30" viewBox="0 0 72 84" fill="none"><path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="white"/></svg>
          </div>
          <h2 style={{ fontFamily:"oswald,sans-serif", fontSize:"26px", fontWeight:700, color:"var(--ink)", margin:0 }}>Reset Password</h2>
          <p style={{ color:"var(--ink-40)", fontSize:"14px", marginTop:"6px" }}>Follow the steps to recover your account</p>
        </div>

        {/* Step indicator */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:"32px" }}>
          {stepLabels.map((label, i) => (
            <React.Fragment key={i}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
                <div style={{
                  width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  background: step > i ? "var(--success)" : step === i ? "var(--crimson)" : "var(--ink-10)",
                  color: step >= i ? "#fff" : "var(--ink-40)",
                  fontSize:"13px", fontWeight:700, transition:"all 300ms ease",
                }}>
                  {step > i ? "✓" : i + 1}
                </div>
                <span style={{ fontSize:"11px", color: step === i ? "var(--crimson)" : "var(--ink-40)", fontWeight: step === i ? 600 : 400, whiteSpace:"nowrap" }}>{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div style={{ flex:1, height:"2px", background: step > i ? "var(--success)" : "var(--ink-10)", margin:"0 8px", marginBottom:"20px", transition:"background 300ms ease" }}/>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div style={{ background:"#fff", borderRadius:"20px", padding:"32px", boxShadow:"var(--shadow-lg)", border:"1px solid var(--ink-10)" }}>
          {step === STEPS.EMAIL && (
            <form onSubmit={emailHandler} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
              <div>
                <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"20px", margin:"0 0 6px", color:"var(--ink)" }}>Enter your email</h3>
                <p style={{ color:"var(--ink-40)", fontSize:"13px", margin:0 }}>We'll send a 4-digit OTP to verify your identity.</p>
              </div>
              <div className="rh-field">
                <label className="rh-label">Email address</label>
                <input className="rh-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value.trim())} />
              </div>
              <button type="submit" disabled={loading} className="rh-btn rh-btn-primary rh-btn-lg" style={{ width:"100%" }}>
                {loading ? "Sending OTP..." : "Send OTP →"}
              </button>
            </form>
          )}

          {step === STEPS.OTP && (
            <form onSubmit={otpHandler} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
              <div>
                <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"20px", margin:"0 0 6px", color:"var(--ink)" }}>Check your email</h3>
                <p style={{ color:"var(--ink-40)", fontSize:"13px", margin:0 }}>OTP sent to <strong>{email}</strong></p>
              </div>
              <div className="rh-field">
                <label className="rh-label">4-digit OTP</label>
                <input className="rh-input" type="number" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value.trim())} style={{ fontSize:"24px", letterSpacing:"0.4em", textAlign:"center" }} maxLength={4} />
              </div>
              <button type="submit" className="rh-btn rh-btn-primary rh-btn-lg" style={{ width:"100%" }}>Verify OTP →</button>
              <button type="button" onClick={() => setStep(STEPS.EMAIL)} style={{ background:"none", border:"none", color:"var(--ink-40)", fontSize:"13px", cursor:"pointer", padding:0 }}>← Back</button>
            </form>
          )}

          {step === STEPS.PASSWORD && (
            <form onSubmit={passwordHandler} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
              <div>
                <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"20px", margin:"0 0 6px", color:"var(--ink)" }}>Set new password</h3>
                <p style={{ color:"var(--ink-40)", fontSize:"13px", margin:0 }}>Must contain uppercase, lowercase, number & symbol.</p>
              </div>
              <div className="rh-field">
                <label className="rh-label">New password</label>
                <div style={{ position:"relative" }}>
                  <input ref={pass} className="rh-input" type={show ? "password" : "text"} placeholder="New secure password" value={password} onChange={e => setPassword(e.target.value.trim())} style={{ paddingRight:"48px" }} autoComplete="new-password" />
                  <button type="button" onClick={() => setShow(!show)} style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--ink-40)", padding:0, display:"flex" }}>
                    {show ? <TbEyeCancel size={18}/> : <TbEyeCheck size={18} style={{ color:"var(--success)" }}/>}
                  </button>
                </div>
                {err && <p className="rh-error" style={{ marginTop:"8px" }}>{err}</p>}
              </div>
              <button type="submit" disabled={loading} className="rh-btn rh-btn-primary rh-btn-lg" style={{ width:"100%" }}>
                {loading ? "Updating..." : "Update Password ✓"}
              </button>
            </form>
          )}
        </div>

        <div style={{ textAlign:"center", marginTop:"20px" }}>
          <Link to="/login" style={{ color:"var(--ink-40)", fontSize:"13px", textDecoration:"none" }}>
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
