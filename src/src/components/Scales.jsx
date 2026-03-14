import React from 'react';

const Scales = ({ text, count, para, center = true }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: center ? "center" : "flex-start", gap: "4px" }}>
    <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-40)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{text}</p>
    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
      <span style={{ fontFamily: "oswald,sans-serif", fontSize: "32px", fontWeight: 700, color: "var(--crimson)", lineHeight: 1 }}>{count}</span>
      <span style={{ fontSize: "14px", color: "var(--ink-40)", fontWeight: 500 }}>{para}</span>
    </div>
  </div>
);

export default Scales;
