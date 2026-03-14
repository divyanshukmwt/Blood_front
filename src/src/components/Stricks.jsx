import React, { useContext, useEffect } from 'react';
import { receiveMessage, sendMessage } from '../config/Socket';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';
import PdfDownloader from './PdfDownloader';
import { toast } from 'react-toastify';

const Stricks = ({ bloodGroup, date, time, status, id }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    sendMessage("delete-Post", id);
    toast.success("Request deleted.");
  };

  useEffect(() => {
    receiveMessage("update-Post", async (data) => {
      await setUser(data);
    });
  }, []);

  const isPending = status === "pending";

  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--ink-10)",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      transition: "all 200ms ease",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--ink-20)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--ink-10)"; }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", background:"var(--crimson-muted)", borderRadius:"8px", padding:"6px 12px" }}>
          <span style={{ fontFamily:"oswald,sans-serif", fontSize:"18px", fontWeight:700, color:"var(--crimson)" }}>{bloodGroup}</span>
        </div>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:"4px",
          padding:"3px 10px", borderRadius:"99px",
          background: isPending ? "var(--warning-bg)" : "var(--success-bg)",
          color: isPending ? "var(--warning)" : "var(--success)",
          fontSize:"11px", fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase",
        }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background: isPending ? "var(--warning)" : "var(--success)", display:"inline-block" }}/>
          {isPending ? "Pending" : "Accepted"}
        </span>
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

      {isPending ? (
        <button
          onClick={() => handleDelete(id)}
          className="rh-btn rh-btn-sm"
          style={{ background:"var(--crimson-muted)", color:"var(--crimson)", border:"1px solid rgba(192,21,42,0.2)", width:"100%", justifyContent:"center", padding:"8px" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
          Delete
        </button>
      ) : (
        <div style={{ display:"flex", gap:"6px" }}>
          <button
            onClick={() => navigate(`/map/${id}`)}
            className="rh-btn rh-btn-info rh-btn-sm"
            style={{ flex:1, justifyContent:"center" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            Map
          </button>
          <div style={{ flex:1 }}>
            <PdfDownloader id={id} className="rh-btn rh-btn-success rh-btn-sm" style={{ width:"100%", justifyContent:"center" }}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stricks;
