import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/admin.context";

const Maintanence = () => {
  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.serverOnOff === false) {
      const lastRoute = localStorage.getItem("lastValidRoute") || "/";
      navigate(lastRoute);
      localStorage.removeItem("lastValidRoute");
    }
  }, [admin?.serverOnOff, navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--ink)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "32px",
      fontFamily: "Poppins,sans-serif",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "rgba(192,21,42,0.04)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(192,21,42,0.04)", pointerEvents: "none" }}/>

      {/* Icon */}
      <div style={{
        width: 88,
        height: 88,
        borderRadius: "24px",
        background: "rgba(192,21,42,0.12)",
        border: "1px solid rgba(192,21,42,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "rh-float 3s ease-in-out infinite",
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        </svg>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <h1 style={{
          fontFamily: "oswald,sans-serif",
          fontSize: "clamp(1.8rem,5vw,3rem)",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 14px",
          letterSpacing: "0.01em",
        }}>
          Under Maintenance
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, margin: 0 }}>
          RedHope is temporarily offline for scheduled maintenance.
          We'll be back up shortly. Thank you for your patience.
        </p>
      </div>

      {/* Status indicator */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "12px 20px",
      }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--crimson)",
          display: "inline-block",
          animation: "rh-heartbeat 2s ease-in-out infinite",
          boxShadow: "0 0 8px rgba(192,21,42,0.6)",
        }}/>
        <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
          Server offline — working to restore service
        </span>
      </div>

      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", marginTop: "8px" }}>
        © RedHope Blood Donation Platform
      </p>
    </div>
  );
};

export default Maintanence;
