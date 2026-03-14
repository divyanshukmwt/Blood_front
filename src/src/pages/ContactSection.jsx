import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../config/Axois";
import AbandonWord from "../utils/AbandonWord";

const ContactSection = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    reset();
    try {
      const res = await Axios.post("/users/contactUs", { name: data.name, email: data.email, message: data.message });
      if (res.status === 200) {
        toast.success("Message sent successfully!");
        navigate("/");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <section style={{ background: "var(--ink)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      {/* Decorative */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(192,21,42,0.08)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="contact-grid">
        {/* Left side */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(192,21,42,0.2)", border: "1px solid rgba(192,21,42,0.3)", borderRadius: "99px", padding: "6px 16px", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Contact Us</span>
            </div>
            <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.15 }}>
              Have a Question<br/>
              <span style={{ color: "var(--crimson)" }}>or Need Support?</span>
            </h2>
          </div>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>
            We're here to help. Whether you have a question about donating blood, need technical support, or want to give feedback — reach out and we'll get back to you shortly.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "📧", label: "Email", value: "codxdot@gmail.com" },
              { icon: "⏱️", label: "Response time", value: "Within 24 hours" },
              { icon: "🏥", label: "Emergency", value: "Use the blood request feature" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 500, margin: "2px 0 0" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side – form */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "36px", backdropFilter: "blur(10px)" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Name</label>
                <input
                  type="text" placeholder="Your name"
                  {...register("name", { required: "Name is required" })}
                  style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", fontSize: "14px", fontFamily: "Poppins,sans-serif", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "var(--crimson)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                {errors.name && <p style={{ color: "var(--crimson)", fontSize: "11px", marginTop: "4px" }}>{errors.name.message}</p>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Email</label>
                <input
                  type="email" placeholder="you@example.com"
                  {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email" } })}
                  style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", fontSize: "14px", fontFamily: "Poppins,sans-serif", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "var(--crimson)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                {errors.email && <p style={{ color: "var(--crimson)", fontSize: "11px", marginTop: "4px" }}>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Message</label>
              <textarea
                placeholder="Your message..."
                {...register("message", {
                  required: "Message is required",
                  validate: (v) => {
                    const lower = v.toLowerCase();
                    return AbandonWord.some(b => lower.includes(b)) ? "Message contains restricted words!" : true;
                  },
                })}
                style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", fontSize: "14px", fontFamily: "Poppins,sans-serif", outline: "none", resize: "vertical", minHeight: "120px", lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = "var(--crimson)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              {errors.message && <p style={{ color: "var(--crimson)", fontSize: "11px", marginTop: "4px" }}>{errors.message.message}</p>}
            </div>

            <button type="submit" className="rh-btn rh-btn-primary rh-btn-lg" style={{ width: "100%", marginTop: "4px" }}>
              Send Message →
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .contact-grid{ grid-template-columns:1fr !important; gap:48px !important; } }
      `}</style>
    </section>
  );
};

export default ContactSection;
