import React from 'react';
import Navbar from "../utils/Navbar";
import Footer from "../components/Footer";
import AboutDets from '../utils/About';

const About = () => {
  return (
    <div className="rh-page" style={{ background:"var(--white)" }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/", name: "Home" },
        { link: "/users/contactUs", name: "Contact" },
      ]} />

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 100%)", padding:"64px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)" }}/>
        <div style={{ position:"relative", maxWidth:"600px", margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"99px", padding:"6px 16px", marginBottom:"20px" }}>
            <span style={{ fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.9)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Meet the team</span>
          </div>
          <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"clamp(2rem,6vw,3.5rem)", fontWeight:700, color:"#fff", margin:"0 0 16px", letterSpacing:"0.02em" }}>Behind RedHope</h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"16px", lineHeight:1.7, margin:0 }}>
            A passionate team building the future of blood donation — connecting donors with those in need, faster than ever before.
          </p>
        </div>
      </div>

      {/* Team cards */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"64px 24px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"32px" }}>
          {AboutDets.map((item, index) => (
            <div
              key={index}
              style={{
                background:"#fff",
                border:"1px solid var(--ink-10)",
                borderRadius:"20px",
                padding:"32px",
                display:"grid",
                gridTemplateColumns: index % 2 === 0 ? "200px 1fr" : "1fr 200px",
                gap:"32px",
                alignItems:"center",
                boxShadow:"var(--shadow-sm)",
                transition:"all 250ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
              className="about-card"
            >
              {/* Image */}
              <div style={{ order: index % 2 === 0 ? 0 : 1 }}>
                <div style={{ width:"100%", aspectRatio:"1", borderRadius:"16px", overflow:"hidden", background:"var(--ink-5)" }}>
                  <img src={item.img} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                </div>
              </div>

              {/* Content */}
              <div style={{ order: index % 2 === 0 ? 1 : 0 }}>
                <span style={{ display:"inline-block", background:"var(--crimson-muted)", color:"var(--crimson)", borderRadius:"99px", padding:"4px 14px", fontSize:"12px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"12px" }}>
                  {item.role}
                </span>
                <h2 style={{ fontFamily:"oswald,sans-serif", fontSize:"28px", fontWeight:700, color:"var(--ink)", margin:"0 0 12px" }}>{item.name}</h2>
                <p style={{ fontSize:"15px", color:"var(--ink-60)", lineHeight:1.75, margin:0 }}>{item.para}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .about-card { grid-template-columns: 1fr !important; }
          .about-card > div { order: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default About;
