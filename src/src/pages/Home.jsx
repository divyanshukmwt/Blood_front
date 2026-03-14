import React, { useState, useEffect, useRef } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../components/Footer";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Testimonials from "./Testimonials";
import AwarenessSection from "./AwarenessSection";
import ContactSection from "./ContactSection";
import Marquee from "./Marquee";
import Loader2 from "../components/Loader2";
import landing from "../../public/landing.webp";
import { useNavigate } from "react-router-dom";

const BloodTypePill = ({ type, delay }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 48, height: 48, borderRadius: "12px",
    background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(8px)",
    fontFamily: "oswald,sans-serif", fontSize: "15px", fontWeight: 700, color: "#fff",
    animation: `rh-float 3s ease-in-out ${delay}s infinite`,
  }}>
    {type}
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const heroRef = useRef(null);

  if (loading) {
    return <Loader2 onComplete={() => setLoading(false)} />;
  }

  return (
    <div style={{ width: "100%", fontFamily: "Poppins,sans-serif" }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
        { link: "/users/contactUs", name: "Contact" },
      ]} />

      {/* ===== HERO ===== */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--ink)",
      }}>
        {/* Hero image */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
        }}>
          <img src={landing} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "82% center", opacity: 0.35 }}/>
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.75) 45%, rgba(192,21,42,0.25) 100%)" }}/>
        </div>

        {/* Grid lines decoration */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }}/>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 32px 80px", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ maxWidth: "620px", display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Tag */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(192,21,42,0.2)", border: "1px solid rgba(192,21,42,0.4)", borderRadius: "99px", padding: "7px 16px", width: "fit-content", animation: "rh-fade-in 0.6s ease" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--crimson)", display: "inline-block", boxShadow: "0 0 6px var(--crimson)" }}/>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.08em", textTransform: "uppercase" }}>India's Blood Donation Network</span>
            </div>

            {/* Headline */}
            <div style={{ animation: "rh-slide-up 0.7s ease 0.1s both" }}>
              <h1 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.0, letterSpacing: "-0.01em" }}>
                YOU DON'T HAVE<br/>
                TO BE A DOCTOR<br/>
                <span style={{ color: "var(--crimson)", display: "inline-block", position: "relative" }}>
                  TO SAVE A LIFE
                  <span style={{ position: "absolute", bottom: 4, left: 0, right: 0, height: 3, background: "var(--crimson)", borderRadius: "2px", opacity: 0.5 }}/>
                </span>
              </h1>
            </div>

            {/* Sub */}
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0, maxWidth: "500px", animation: "rh-slide-up 0.7s ease 0.25s both" }}>
              Be a hero. Every drop of blood is more than a donation — it's a promise of hope, a gift of love, and a chance to save a life.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", animation: "rh-slide-up 0.7s ease 0.35s both" }}>
              <button onClick={() => navigate("/users/profile")} className="rh-btn rh-btn-primary rh-btn-lg"
                style={{ fontSize: "16px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z" fill="white"/></svg>
                Join RedHope
              </button>
              <button onClick={() => navigate("/donate/request-list")} className="rh-btn rh-btn-lg"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", fontSize: "16px" }}>
                View Requests →
              </button>
            </div>

            {/* Stats bar */}
            <div style={{ display: "flex", gap: "28px", paddingTop: "8px", flexWrap: "wrap", animation: "rh-slide-up 0.7s ease 0.45s both" }}>
              {[["1,250+","Active Donors"],["870+","Lives Saved"],["24/7","Emergency Support"]].map(([num, label]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ fontFamily: "oswald,sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{num}</span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating blood types – desktop only */}
          <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "12px" }} className="hero-blood-types">
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>All types</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((type, i) => (
                <BloodTypePill key={type} type={type} delay={i * 0.2}/>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 2 }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}/>
        </div>

        <style>{`
          @media(max-width:900px){ .hero-blood-types{ display:none !important; } }
        `}</style>
      </section>

      {/* ===== ALL SECTIONS ===== */}
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Testimonials />
      <AwarenessSection />
      <Marquee />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
