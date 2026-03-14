import React from 'react';

const BlockInterface = () => (
  <div style={{
    background:"#fff",
    border:"1.5px solid var(--crimson)",
    borderRadius:"16px",
    padding:"24px",
    display:"flex",
    alignItems:"center",
    gap:"16px",
    boxShadow:"var(--shadow-crimson)",
  }}>
    <div style={{ width:44, height:44, background:"var(--crimson-muted)", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
    </div>
    <div>
      <h4 style={{ fontFamily:"oswald,sans-serif", fontSize:"16px", fontWeight:700, color:"var(--crimson)", margin:"0 0 4px" }}>Account Restricted</h4>
      <p style={{ fontSize:"13px", color:"var(--ink-40)", margin:0 }}>Your account has been blocked by an administrator. Contact support for assistance.</p>
    </div>
  </div>
);

export default BlockInterface;
