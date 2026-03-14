import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,21,42,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(6rem, 18vw, 12rem)', color: 'var(--crimson)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '0' }}>404</div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '16px' }}>Page not found</h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', marginBottom: '40px', maxWidth: '400px' }}>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" style={{
        display: 'inline-block', padding: '14px 28px', borderRadius: '10px',
        background: 'var(--crimson)', color: 'white', textDecoration: 'none',
        fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.95rem',
      }}>← Back to Home</Link>
    </div>
  </div>
);

export default PageNotFound;
