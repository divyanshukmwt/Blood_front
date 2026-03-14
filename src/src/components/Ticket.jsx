import React from 'react';

const Ticket = ({ data }) => (
  <div style={{
    background: "#fff", border: "1px solid var(--ink-10)", borderRadius: "16px",
    padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
    boxShadow: "var(--shadow-sm)", transition: "all 200ms ease",
  }}
  onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
  onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 36, height: 36, background: "var(--info-bg)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
        </div>
        <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>{data.ticketTitle}</h3>
      </div>
      <span style={{ background: "var(--info-bg)", color: "var(--info)", borderRadius: "6px", padding: "3px 8px", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>Ticket</span>
    </div>

    <p style={{ fontSize: "13px", color: "var(--ink-60)", lineHeight: 1.7, margin: 0 }}>{data.ticketDescription}</p>

    <div style={{ display: "flex", gap: "12px", paddingTop: "8px", borderTop: "1px solid var(--ink-10)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-40)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span style={{ fontSize: "12px", color: "var(--ink-40)" }}>{data.date}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-40)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span style={{ fontSize: "12px", color: "var(--ink-40)" }}>{data.time}</span>
      </div>
    </div>
  </div>
);

export default Ticket;
