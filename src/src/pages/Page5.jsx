import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 1, title: "Sign Up / Login", description: "Create an account or log in to join our lifesaving community. Your profile helps us connect you with requests quickly.", icon: "👤" },
  { id: 2, title: "Add a Request or Donate", description: "If you or someone you know needs blood, submit a request with blood group and location details, or browse requests to donate.", icon: "🩸" },
  { id: 3, title: "Smart Donor Matching", description: "Our system finds the nearest compatible donors so you can connect with them quickly for safe and timely blood delivery.", icon: "🎯" },
  { id: 4, title: "Connect & Coordinate", description: "Donors contact the requester, track live location on the map, and together coordinate the donation process efficiently.", icon: "📍" },
  { id: 5, title: "Save Lives & Track Impact", description: "Every successful donation helps save lives. Track your impact, download certificates, and inspire others to join.", icon: "💓" },
];

const Page5 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const barRef = useRef(null);

  useEffect(() => {
    const totalSteps = steps.length;
    stepRefs.current.forEach((step, idx) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveStep(idx);
          if (barRef.current) {
            gsap.to(barRef.current, { height: `${(idx / (totalSteps - 1)) * 100}%`, duration: 0.3, ease: "none" });
          }
        },
        onEnterBack: () => {
          setActiveStep(idx);
          if (barRef.current) {
            gsap.to(barRef.current, { height: `${(idx / (totalSteps - 1)) * 100}%`, duration: 0.3, ease: "none" });
          }
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--crimson-muted)", borderRadius: "99px", padding: "6px 16px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.08em", textTransform: "uppercase" }}>How It Works</span>
          </div>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            Our Life-Saving Process
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink-40)", marginTop: "12px", lineHeight: 1.7, maxWidth: "480px", margin: "12px auto 0" }}>
            From sign-up to donation, we've made every step simple, fast, and effective.
          </p>
        </div>

        <div style={{ display: "flex", gap: "40px" }} className="process-layout">
          {/* Timeline column */}
          <div style={{ position: "relative", width: "40px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
            {/* Track */}
            <div style={{ position: "absolute", top: "20px", bottom: "20px", width: "2px", background: "var(--ink-10)", left: "50%", transform: "translateX(-50%)" }}/>
            {/* Progress */}
            <div ref={barRef} style={{ position: "absolute", top: "20px", width: "2px", background: "var(--crimson)", left: "50%", transform: "translateX(-50%)", height: "0%", transition: "height 0.3s ease", boxShadow: "0 0 8px rgba(192,21,42,0.4)" }}/>
            {/* Dots */}
            {steps.map((_, idx) => (
              <div key={idx} style={{
                position: "absolute",
                top: `calc(${(idx / (steps.length - 1)) * 100}% * (100% - 40px) / 100% + 20px)`,
                width: 16, height: 16, borderRadius: "50%",
                background: activeStep >= idx ? "var(--crimson)" : "#fff",
                border: `2px solid ${activeStep >= idx ? "var(--crimson)" : "var(--ink-10)"}`,
                left: "50%", transform: "translate(-50%, -50%)",
                transition: "all 300ms ease",
                boxShadow: activeStep === idx ? "0 0 0 4px rgba(192,21,42,0.15)" : "none",
                zIndex: 2,
              }}/>
            ))}
          </div>

          {/* Steps */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "32px" }}>
            {steps.map((step, idx) => (
              <div
                key={step.id}
                ref={el => { if (el) stepRefs.current[idx] = el; }}
                style={{
                  background: activeStep === idx ? "var(--white)" : "var(--ink-2)",
                  border: `1.5px solid ${activeStep === idx ? "var(--crimson)" : "var(--ink-10)"}`,
                  borderRadius: "16px",
                  padding: "24px",
                  transition: "all 300ms ease",
                  boxShadow: activeStep === idx ? "var(--shadow-crimson)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "10px",
                    background: activeStep === idx ? "var(--crimson)" : "var(--ink-5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", flexShrink: 0, transition: "background 300ms ease",
                  }}>
                    {activeStep === idx ? step.icon : <span style={{ fontFamily: "oswald,sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink-40)" }}>0{step.id}</span>}
                  </div>
                  <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "18px", fontWeight: 700, color: activeStep === idx ? "var(--crimson)" : "var(--ink)", margin: 0, transition: "color 300ms ease" }}>
                    {step.title}
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--ink-60)", lineHeight: 1.7, margin: 0, paddingLeft: "54px" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:600px){ .process-layout{ flex-direction:column !important; } }
      `}</style>
    </section>
  );
};

export default Page5;
