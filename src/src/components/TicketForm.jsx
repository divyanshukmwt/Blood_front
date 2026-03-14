import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import AdminAxios from "../config/AdminAxios";
import { toast } from 'react-toastify';

const TicketForm = ({ vari, fn }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.display = vari ? "flex" : "none";
  }, [vari]);

  const onSubmit = async (data) => {
    const { ticketTitle, description } = data;
    try {
      await AdminAxios.post("/admin/ticket-maker", { ticketTitle, description });
      fn(false);
      reset();
      toast.success("👏 Ticket raised successfully!");
    } catch {
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <div ref={ref} style={{ display: "none", position: "fixed", inset: 0, background: "rgba(13,13,13,0.55)", backdropFilter: "blur(6px)", zIndex: 200, alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "480px", boxShadow: "var(--shadow-xl)", animation: "rh-slide-up 0.25s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Raise a Ticket</h3>
            <p style={{ fontSize: "13px", color: "var(--ink-40)", margin: "4px 0 0" }}>Describe your issue or request</p>
          </div>
          <button onClick={() => fn(false)} style={{ width: 32, height: 32, borderRadius: "8px", background: "var(--ink-5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-60)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="rh-field">
            <label className="rh-label">Ticket Title</label>
            <input
              className="ticket rh-input"
              type="text"
              placeholder="Brief title for your issue"
              {...register("ticketTitle", {
                required: "Ticket title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
                maxLength: { value: 20, message: "Title must be under 20 characters" },
              })}
            />
            {errors.ticketTitle && <p className="rh-error">{errors.ticketTitle.message}</p>}
          </div>

          <div className="rh-field">
            <label className="rh-label">Description</label>
            <textarea
              className="desc rh-input"
              placeholder="Describe the issue in detail..."
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" },
                maxLength: { value: 250, message: "Description must be under 250 characters" },
              })}
              style={{ resize: "vertical", minHeight: "110px", fontFamily: "Poppins,sans-serif", lineHeight: 1.6 }}
            />
            {errors.description && <p className="rh-error">{errors.description.message}</p>}
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button type="button" onClick={() => fn(false)} className="rh-btn rh-btn-ghost rh-btn-md" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="rh-btn rh-btn-primary rh-btn-md" style={{ flex: 1 }}>Submit Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
