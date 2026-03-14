import React from "react";
import { useNavigate } from "react-router-dom";

const DonarStricks = ({ bloodGroup, date, time, id }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      background:"#fff", border:"1px solid var(--ink-10)", borderRadius:"12px", padding:"16px",
      display:"flex", flexDirection:"column", gap:"10px", transition:"all 200ms ease",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--ink-20)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--ink-10)"; }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", background:"var(--crimson-muted)", borderRadius:"8px", padding:"6px 12px" }}>
          <span style={{ fontFamily:"oswald,sans-serif", fontSize:"18px", fontWeight:700, color:"var(--crimson)" }}>{bloodGroup}</span>
        </div>
        <span className="rh-badge rh-badge-accepted">Donated</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px" }}>
        <div style={{ background:"var(--ink-2)", borderRadius:"6px", padding:"7px 10px" }}>
          <p style={{ fontSize:"10px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px" }}>Date</p>
          <p style={{ fontSize:"12px", fontWeight:600, color:"var(--ink)", margin:0 }}>{date}</p>
        </div>
        <div style={{ background:"var(--ink-2)", borderRadius:"6px", padding:"7px 10px" }}>
          <p style={{ fontSize:"10px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px" }}>Time</p>
          <p style={{ fontSize:"12px", fontWeight:600, color:"var(--ink)", margin:0 }}>{time}</p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/map/${id}`)}
        className="rh-btn rh-btn-info rh-btn-sm"
        style={{ width:"100%", justifyContent:"center" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
        View on Map
      </button>
    </div>
  );
};

export default DonarStricks;
