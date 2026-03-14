import React, { useState } from "react";

const tipsData = [
  { id: 1, title: "Benefits of Donation", icon: "💪", color: "var(--crimson)", bg: "var(--crimson-muted)", content: "Donating blood regularly can improve heart health, stimulate blood cell production, and help save lives. Every donation can save up to 3 lives!" },
  { id: 2, title: "Myths vs Facts", icon: "🔍", color: "var(--info)", bg: "var(--info-bg)", content: "Myth: Donation is painful. Fact: It's quick and safe. Myth: Can't donate with tattoos. Fact: You can donate after a waiting period." },
  { id: 3, title: "Donation Guidelines", icon: "📋", color: "var(--success)", bg: "var(--success-bg)", content: "Donors should be 18-65 years old, weigh at least 50kg, and be in good health. Eat well, stay hydrated, and avoid alcohol before donating." },
  { id: 4, title: "Eligibility Criteria", icon: "✅", color: "var(--warning)", bg: "var(--warning-bg)", content: "Check hemoglobin levels, recent medical conditions, and travel history. Only eligible donors should donate to ensure safety for both parties." },
  { id: 5, title: "Frequency of Donation", icon: "📅", color: "var(--crimson)", bg: "var(--crimson-muted)", content: "Men can donate every 12 weeks and women every 16 weeks. Maintaining proper intervals keeps your body healthy and ready to help others." },
  { id: 6, title: "Hydration & Nutrition", icon: "🥗", color: "var(--success)", bg: "var(--success-bg)", content: "Drink plenty of water and have a healthy meal before donating. This helps prevent dizziness or fatigue after the donation process." },
  { id: 7, title: "Post-Donation Care", icon: "🩹", color: "var(--info)", bg: "var(--info-bg)", content: "Rest for 10–15 minutes after donation, avoid heavy exercise, and keep the bandage on for a few hours. Stay hydrated to recover quickly." },
];

const AwarenessSection = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--crimson-muted)", borderRadius: "99px", padding: "6px 16px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Awareness</span>
          </div>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
            Blood Donation Awareness
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink-40)", marginTop: "12px", lineHeight: 1.7, maxWidth: "520px", margin: "12px auto 0" }}>
            Everything you need to know before, during, and after donating blood.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {tipsData.map((tip) => (
            <div
              key={tip.id}
              onClick={() => setExpanded(expanded === tip.id ? null : tip.id)}
              style={{
                background: expanded === tip.id ? tip.bg : "#fff",
                border: `1.5px solid ${expanded === tip.id ? tip.color : "var(--ink-10)"}`,
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 250ms ease",
                boxShadow: expanded === tip.id ? `0 4px 20px ${tip.color}22` : "var(--shadow-sm)",
              }}
              onMouseEnter={e => { if (expanded !== tip.id) { e.currentTarget.style.borderColor = "var(--ink-20)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; } }}
              onMouseLeave={e => { if (expanded !== tip.id) { e.currentTarget.style.borderColor = "var(--ink-10)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; } }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 40, height: 40, background: tip.bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                    {tip.icon}
                  </div>
                  <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>{tip.title}</h3>
                </div>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: expanded === tip.id ? tip.color : "var(--ink-5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 200ms ease",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={expanded === tip.id ? "#fff" : "var(--ink-40)"} strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: expanded === tip.id ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms ease" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
              {expanded === tip.id && (
                <p style={{ fontSize: "14px", color: "var(--ink-60)", lineHeight: 1.75, margin: "16px 0 0", paddingTop: "16px", borderTop: `1px solid ${tip.color}33` }}>
                  {tip.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwarenessSection;
