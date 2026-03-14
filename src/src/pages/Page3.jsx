import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Active Donors", value: 1250, suffix: "+", icon: "👥", desc: "Registered & verified" },
  { label: "Units Donated", value: 3500, suffix: "+", icon: "🩸", desc: "Blood units collected" },
  { label: "Lives Saved", value: 870, suffix: "+", icon: "💓", desc: "People helped" },
  { label: "Donor Locations", value: 120, suffix: "+", icon: "📍", desc: "Cities covered" },
];

const Page3 = () => {
  const counterRefs = useRef([]);
  counterRefs.current = [];

  const addToRefs = (el) => {
    if (el && !counterRefs.current.includes(el)) counterRefs.current.push(el);
  };

  useEffect(() => {
    counterRefs.current.forEach((el) => {
      const endValue = parseInt(el.dataset.value);
      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  return (
    <section style={{ background: "var(--crimson)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      {/* Decorative bg */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Our Impact</p>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "0.01em" }}>
            Numbers That Tell Our Story
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "20px", padding: "32px 24px", textAlign: "center", backdropFilter: "blur(10px)", transition: "transform 200ms ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{stat.icon}</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "2px", marginBottom: "6px" }}>
                <span
                  ref={addToRefs}
                  data-value={stat.value}
                  style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", lineHeight: 1 }}
                >0</span>
                <span style={{ fontFamily: "oswald,sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{stat.suffix}</span>
              </div>
              <p style={{ fontFamily: "oswald,sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>{stat.label}</p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", margin: 0 }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .stats-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:480px){ .stats-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Page3;
