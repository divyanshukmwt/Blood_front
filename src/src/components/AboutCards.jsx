import React from 'react';

const AboutCards = ({ src, name, role, para }) => {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--ink-10)",
      borderRadius: "20px",
      padding: "28px",
      display: "grid",
      gridTemplateColumns: "160px 1fr",
      gap: "28px",
      alignItems: "center",
      boxShadow: "var(--shadow-sm)",
      transition: "all 250ms ease",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ width: "100%", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", flexShrink: 0, border: "1px solid var(--ink-10)" }}>
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "0% 10%", transition: "transform 400ms ease" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ display: "inline-block", background: "var(--crimson-muted)", color: "var(--crimson)", borderRadius: "99px", padding: "4px 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", width: "fit-content" }}>
          {role}
        </span>
        <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "24px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>{name}</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[["Dept", "BCA"], ["College", "Maharshi Arvind School of Management Studies"]].map(([label, value]) => (
            <div key={label}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink-40)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}: </span>
              <span style={{ fontSize: "12px", color: "var(--ink-60)" }}>{value}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "14px", color: "var(--ink-60)", lineHeight: 1.75, margin: 0 }}>{para}</p>
      </div>
    </div>
  );
};

export default AboutCards;
