import React from 'react';
import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const links = {
    service: [
      { name: "Receiver", href: "/reciver/blood" },
      { name: "Donation", href: "/donate/request-list" },
    ],
    helps: [
      { name: "Gmail", href: "mailto:codxdot@gmail.com" },
      { name: "Admin", href: "/admin" },
      { name: "Contact Us", href: "/users/contactUs" },
    ],
    legal: [
      { name: "Terms of Use", href: "src/assets/pdfs/Terms of Use.pdf", download: true },
      { name: "Cookie Policy", href: "src/assets/pdfs/Cookie Policy.pdf", download: true },
      { name: "Privacy Policy", href: "src/assets/pdfs/Privacy Policy.pdf", download: true },
    ],
  };

  return (
    <footer style={{ background:"var(--ink)", color:"rgba(255,255,255,0.7)", fontFamily:"Poppins,sans-serif" }}>
      {/* Top CTA bar */}
      <div style={{ background:"var(--crimson)", padding:"28px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"24px", flexWrap:"wrap" }}>
        <div>
          <p style={{ color:"#fff", fontFamily:"oswald,sans-serif", fontSize:"20px", fontWeight:700, margin:0, letterSpacing:"0.02em" }}>Ready to save a life today?</p>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"13px", marginTop:"4px", margin:"4px 0 0" }}>Join thousands of heroes who donate blood every month.</p>
        </div>
        <button
          onClick={() => navigate("/register")}
          style={{ background:"#fff", color:"var(--crimson)", border:"none", borderRadius:"10px", padding:"12px 28px", fontFamily:"Poppins,sans-serif", fontWeight:700, fontSize:"15px", cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 4px 16px rgba(0,0,0,0.15)", transition:"all 200ms ease" }}
          onMouseEnter={e => { e.target.style.background = "var(--crimson-muted)"; }}
          onMouseLeave={e => { e.target.style.background = "#fff"; }}
        >
          Join RedHope Free →
        </button>
      </div>

      {/* Main footer */}
      <div style={{ padding:"56px 32px 40px", maxWidth:"1280px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"48px", marginBottom:"48px" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
              <div style={{ width:36, height:36, background:"var(--crimson)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="20" height="23" viewBox="0 0 72 84" fill="none"><path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="white"/></svg>
              </div>
              <span style={{ fontFamily:"oswald,sans-serif", fontWeight:700, fontSize:"22px", color:"#fff", letterSpacing:"0.04em" }}>REDHOPE</span>
            </div>
            <p style={{ fontSize:"14px", lineHeight:1.8, color:"rgba(255,255,255,0.5)", maxWidth:"280px", margin:"0 0 20px" }}>
              Together, we save lives and build a healthier India. Every drop of blood is a gift of hope — one donation can save three lives.
            </p>
            <div style={{ display:"flex", gap:"10px" }}>
              {[
                { icon:"❤️", label:"Blood Donation" },
                { icon:"🏥", label:"Healthcare" },
              ].map(item => (
                <span key={item.label} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"99px", padding:"5px 12px", fontSize:"12px", color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", gap:"5px" }}>
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Service links */}
          {[
            { heading: "Services", items: links.service },
            { heading: "Support", items: links.helps },
            { heading: "Legal", items: links.legal },
          ].map(({ heading, items }) => (
            <div key={heading}>
              <h4 style={{ color:"rgba(255,255,255,0.9)", fontFamily:"oswald,sans-serif", fontSize:"16px", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", margin:"0 0 20px" }}>{heading}</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {items.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    {...(link.download && { download: link.name })}
                    style={{ color:"rgba(255,255,255,0.5)", fontSize:"14px", textDecoration:"none", transition:"color 150ms ease", display:"inline-block" }}
                    onMouseEnter={e => { e.target.style.color = "#fff"; }}
                    onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", margin:0 }}>© 2024 RedHope. All rights reserved.</p>
          <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)", margin:0 }}>Made with ❤️ to save lives across India</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
