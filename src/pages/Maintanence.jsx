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
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,21,42,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '5rem', marginBottom: '24px', animation: 'float 3s ease-in-out infinite' }}>🔧</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
          Under Maintenance
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem', maxWidth: '460px', lineHeight: 1.7, marginBottom: '40px' }}>
          We're making RedHope even better. Please check back in a little while.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '12px 20px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', display: 'inline-block', animation: 'pulse-ring 1.5s infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>We'll be back soon</span>
        </div>
      </div>
      <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
    </div>
  );
};

export default Maintanence;
