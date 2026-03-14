import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";

const PageNotFound = () => {
  const containerRef = useRef();
  const paraRef = useRef();

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;
      const wavyEl = containerRef.current.querySelector(".wavy");
      if (!wavyEl) return;
      const { chars } = splitText(wavyEl);
      containerRef.current.style.visibility = "visible";
      const d = 0.55;
      animate(chars, { y: [-20, 20] }, { repeat: Infinity, repeatType: "mirror", ease: "easeInOut", duration: 2, delay: stagger(d, { startDelay: -d * chars.length }) });
    });
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!paraRef.current) return;
      const paraEl = paraRef.current.querySelector(".para");
      if (!paraEl) return;
      const { chars } = splitText(paraEl);
      paraRef.current.style.visibility = "visible";
      const d = 0.15;
      animate(chars, { y: [-10, 10] }, { repeat: Infinity, repeatType: "mirror", ease: "easeInOut", duration: 2, delay: stagger(d, { startDelay: -d * chars.length }) });
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px", fontFamily: "Poppins,sans-serif", position: "relative", overflow: "hidden" }}>
      <Navbar field={[
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
      ]} />

      {/* Background decoration */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(192,21,42,0.04)", pointerEvents: "none" }}/>

      <div ref={containerRef} style={{ visibility: "hidden" }}>
        <h1 className="wavy" style={{ fontFamily: "OpenSans,sans-serif", fontSize: "clamp(6rem,18vw,12rem)", fontWeight: 200, color: "var(--crimson)", margin: 0, lineHeight: 1, letterSpacing: "0.1em", textShadow: "0 0 60px rgba(192,21,42,0.5)" }}>
          404
        </h1>
      </div>

      <div ref={paraRef} style={{ visibility: "hidden" }}>
        <p className="para" style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", letterSpacing: "0.15em", margin: 0, fontWeight: 300 }}>
          Page Not Found
        </p>
      </div>

      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "15px", textAlign: "center", maxWidth: "380px", lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/" style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        padding: "14px 28px", background: "var(--crimson)", color: "#fff",
        borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "15px",
        boxShadow: "var(--shadow-crimson)", transition: "all 200ms ease",
      }}
      onMouseEnter={e => { e.target.style.background = "var(--crimson-dark)"; e.target.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.target.style.background = "var(--crimson)"; e.target.style.transform = "translateY(0)"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
