import React, { useRef, useEffect } from 'react';
import page2 from "../../public/page2.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.from(imageRef.current, {
      x: -60, opacity: 0, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: imageRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
    gsap.from(textRef.current, {
      x: 60, opacity: 0, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: textRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
  }, []);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="page2-grid">
        {/* Image */}
        <div ref={imageRef}>
          <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", position: "relative" }}>
            <img src={page2} alt="Blood donation" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}/>
            {/* Floating stat badge */}
            <div style={{ position: "absolute", bottom: "24px", left: "24px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.8)" }}>
              <p style={{ fontFamily: "oswald,sans-serif", fontSize: "28px", fontWeight: 700, color: "var(--crimson)", margin: 0, lineHeight: 1 }}>3,500+</p>
              <p style={{ fontSize: "13px", color: "var(--ink-60)", margin: "4px 0 0", fontWeight: 500 }}>Units donated</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--crimson-muted)", borderRadius: "99px", padding: "6px 16px", width: "fit-content" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--crimson)", display: "inline-block" }}/>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Our Mission</span>
          </div>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            We Believe We Can<br/>
            <span style={{ color: "var(--crimson)" }}>Save More Lives</span>
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink-60)", lineHeight: 1.8, margin: 0 }}>
            Every drop of blood has the power to give someone a second chance. At RedHope, we connect caring donors with patients in urgent need, turning simple acts of kindness into life-saving miracles.
          </p>
          <p style={{ fontSize: "15px", color: "var(--ink-60)", lineHeight: 1.8, margin: 0 }}>
            By making blood donation easy, safe, and accessible, we bring hope to families, strength to hospitals, and life to those who need it most. Together, we're not just donating blood — we're giving hope.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "8px" }}>
            {[["🩸","Safe & Verified"],["📍","Location-Based"],["⚡","Real-Time"]].map(([icon,label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--ink-2)", border: "1px solid var(--ink-10)", borderRadius: "10px", padding: "10px 16px" }}>
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink-60)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .page2-grid{ grid-template-columns:1fr !important; gap:40px !important; } }
      `}</style>
    </section>
  );
};

export default Page2;
