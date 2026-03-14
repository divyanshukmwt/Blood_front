import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../context/user.context';
import { sendMessage } from '../config/Socket';
import { toast } from 'react-toastify';

const DonateForm = ({ modal, modalfn, name, dataId }) => {
  const ref = useRef();
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.display = modal ? "flex" : "none";
  }, [modal]);

  const onConfirm = (data) => {
    try {
      const { postId, donarId, donarNumber } = data;
      sendMessage("accepted-request", { postId, donarId, donarNumber });
      modalfn(false);
      toast.success("🎉 Donation confirmed successfully!");
    } catch {
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <div
      ref={ref}
      style={{ display:"none", position:"fixed", inset:0, background:"rgba(13,13,13,0.55)", backdropFilter:"blur(6px)", zIndex:300, alignItems:"center", justifyContent:"center", padding:"20px" }}
    >
      <div style={{ background:"#fff", borderRadius:"24px", padding:"32px", width:"100%", maxWidth:"460px", boxShadow:"var(--shadow-xl)", animation:"rh-slide-up 0.25s ease" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
          <div>
            <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"22px", fontWeight:700, color:"var(--ink)", margin:0 }}>Confirm Donation</h3>
            <p style={{ fontSize:"13px", color:"var(--ink-40)", margin:"4px 0 0" }}>This action cannot be undone</p>
          </div>
          <button
            type="button"
            onClick={() => modalfn(false)}
            style={{ width:32, height:32, borderRadius:"8px", background:"var(--ink-5)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--ink-60)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onConfirm)} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          <input {...register("postId")} type="hidden" value={dataId} />
          <input {...register("donarId")} type="hidden" value={user._id} />

          {/* Handshake display */}
          <div style={{ display:"flex", alignItems:"center", gap:"12px", background:"var(--ink-2)", borderRadius:"12px", padding:"16px" }}>
            <div style={{ flex:1, textAlign:"center" }}>
              <p style={{ fontSize:"11px", fontWeight:600, color:"var(--ink-40)", textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 4px" }}>Donor</p>
              <p style={{ fontSize:"15px", fontWeight:700, color:"var(--ink)", margin:0 }}>{user.name}</p>
            </div>
            <div style={{ width:36, height:36, background:"var(--success-bg)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round"><path d="M9 12l2 2 4-4"/><path d="M20.618 5.984A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.052-.135-2.078-.382-3.016z"/></svg>
            </div>
            <div style={{ flex:1, textAlign:"center" }}>
              <p style={{ fontSize:"11px", fontWeight:600, color:"var(--ink-40)", textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 4px" }}>Recipient</p>
              <p style={{ fontSize:"15px", fontWeight:700, color:"var(--ink)", margin:0 }}>{name}</p>
            </div>
          </div>

          <div className="rh-field">
            <label className="rh-label">Your Contact Number</label>
            <input
              {...register("donarNumber", {
                maxLength: { value: 10, message: "Number must be 10 digits" },
                minLength: { value: 10, message: "Number must be 10 digits" },
              })}
              type="number"
              placeholder="Enter your 10-digit number"
              className="rh-input"
              style={{ letterSpacing:"0.1em" }}
            />
            {errors.donarNumber && <p className="rh-error">{errors.donarNumber.message}</p>}
          </div>

          <div style={{ background:"var(--warning-bg)", borderRadius:"10px", padding:"12px 14px" }}>
            <p style={{ fontSize:"12px", color:"var(--warning)", margin:0, lineHeight:1.6 }}>
              ⚠️ Once confirmed, you are committing to donate. Please ensure you are available and eligible.
            </p>
          </div>

          <button type="submit" className="rh-btn rh-btn-success rh-btn-lg" style={{ width:"100%" }}>
            Confirm Donation ✓
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
