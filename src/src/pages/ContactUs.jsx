import { useContext } from 'react';
import Navbar from '../utils/Navbar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import { UserContext } from '../context/user.context';
import { toast } from 'react-toastify';
import Axios from "../config/Axois";
import AbandonWord from "../utils/AbandonWord";

const ContactUs = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    reset();
    const res = await Axios.post("/users/contactUs", { name: user.name, email: user.email, message: data.message });
    if (res.status === 200) {
      toast.success("Message sent successfully.");
      navigate("/users/profile");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="rh-page" style={{ background:"var(--ink-2)" }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
      ]} />

      <div style={{ maxWidth:"600px", margin:"0 auto", padding:"48px 24px" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"40px" }}>
          <div style={{ width:56, height:56, background:"var(--crimson)", borderRadius:"14px", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"32px", fontWeight:700, color:"var(--ink)", margin:0 }}>Contact Us</h1>
          <p style={{ color:"var(--ink-40)", fontSize:"15px", marginTop:"8px" }}>Have a question or feedback? We'd love to hear from you.</p>
        </div>

        {/* Contact card */}
        <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", padding:"32px", boxShadow:"var(--shadow-sm)" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            {/* Name (readonly) */}
            <div className="rh-field">
              <label className="rh-label">Your Name</label>
              <input
                {...register("name")}
                className="rh-input"
                type="text"
                value={user.name}
                readOnly
                placeholder="Your name"
              />
            </div>

            {/* Email (readonly) */}
            <div className="rh-field">
              <label className="rh-label">Email Address</label>
              <input
                {...register("email")}
                className="rh-input"
                type="email"
                value={user.email}
                readOnly
                placeholder="Your email"
              />
            </div>

            {/* Message */}
            <div className="rh-field">
              <label className="rh-label">Message</label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  validate: (value) => {
                    const lower = value.toLowerCase();
                    return AbandonWord.some(b => lower.includes(b)) ? "Message contains restricted words!" : true;
                  },
                })}
                className="rh-input"
                placeholder="Describe your issue, suggestion, or feedback..."
                style={{ resize:"vertical", minHeight:"140px", fontFamily:"Poppins,sans-serif", lineHeight:1.6 }}
              />
              {errors.message && <p className="rh-error">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="rh-btn rh-btn-primary rh-btn-lg"
              style={{ width:"100%" }}
            >
              Send Message →
            </button>
          </form>

          <div style={{ marginTop:"28px", paddingTop:"24px", borderTop:"1px solid var(--ink-10)", display:"flex", gap:"24px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:36, height:36, background:"var(--crimson-muted)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p style={{ fontSize:"11px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", margin:0 }}>Email</p>
                <p style={{ fontSize:"13px", color:"var(--ink)", fontWeight:500, margin:0 }}>codxdot@gmail.com</p>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:36, height:36, background:"var(--success-bg)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p style={{ fontSize:"11px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", margin:0 }}>Response Time</p>
                <p style={{ fontSize:"13px", color:"var(--ink)", fontWeight:500, margin:0 }}>Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
