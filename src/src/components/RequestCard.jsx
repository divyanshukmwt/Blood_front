import React from 'react';
import { LiaUserClockSolid } from "react-icons/lia";
import { PiConfettiBold } from "react-icons/pi";

const RequestCard = ({ data, user }) => {
  const isPending = data.status === "pending";

  return (
    <div
      className="rh-card"
      style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"14px" }}
    >
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ width:44, height:44, borderRadius:"12px", overflow:"hidden", border:"1px solid var(--ink-10)", background:"var(--ink-5)", flexShrink:0 }}>
          <img src={`data:${user.pictype};base64,${user.profilepic}`} alt={user.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        </div>
        <div>
          <p style={{ fontFamily:"Poppins,sans-serif", fontSize:"14px", fontWeight:600, color:"var(--ink)", margin:0 }}>{user.name}</p>
          <p style={{ fontSize:"12px", color:"var(--ink-40)", margin:0 }}>Your Request</p>
        </div>
        <span style={{
          marginLeft:"auto",
          display:"inline-flex", alignItems:"center", gap:"5px",
          padding:"4px 10px", borderRadius:"99px",
          background: isPending ? "var(--warning-bg)" : "var(--success-bg)",
          color: isPending ? "var(--warning)" : "var(--success)",
          fontSize:"11px", fontWeight:700, letterSpacing:"0.05em", textTransform:"uppercase"
        }}>
          {isPending ? <LiaUserClockSolid/> : <PiConfettiBold/>}
          {isPending ? "Pending" : "Accepted"}
        </span>
      </div>

      <hr style={{ border:"none", borderTop:"1px solid var(--ink-10)", margin:0 }}/>

      {/* Blood type */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", background:"var(--crimson-subtle)", borderRadius:"10px", padding:"12px" }}>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontSize:"11px", fontWeight:600, color:"var(--ink-40)", letterSpacing:"0.06em", textTransform:"uppercase", margin:"0 0 3px" }}>Blood Type Requested</p>
          <p style={{ fontFamily:"oswald,sans-serif", fontSize:"32px", fontWeight:700, color:"var(--crimson)", margin:0, lineHeight:1 }}>{data.bloodType}</p>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
        <div style={{ background:"var(--ink-2)", borderRadius:"8px", padding:"9px 12px" }}>
          <p style={{ fontSize:"11px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px" }}>Date</p>
          <p style={{ fontSize:"13px", fontWeight:600, color:"var(--ink)", margin:0 }}>{data.date}</p>
        </div>
        <div style={{ background:"var(--ink-2)", borderRadius:"8px", padding:"9px 12px" }}>
          <p style={{ fontSize:"11px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px" }}>Time</p>
          <p style={{ fontSize:"13px", fontWeight:600, color:"var(--ink)", margin:0 }}>{data.time}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
