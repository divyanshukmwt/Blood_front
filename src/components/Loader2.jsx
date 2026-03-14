import React, { useEffect, useState } from 'react';

const Loader2 = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 400); }, 200);
          return 100;
        }
        return p + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--ink)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: done ? 0 : 1,
      transition: 'opacity 0.4s ease',
      pointerEvents: done ? 'none' : 'all',
    }}>
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--crimson)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 ${Math.round(progress / 10) * 2}px rgba(192,21,42,${(100 - progress) / 200})`,
          transition: 'box-shadow 0.1s',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/>
          </svg>
        </div>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'white', letterSpacing: '-0.02em' }}>
          Red<span style={{ color: 'var(--crimson-light)' }}>Hope</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '4px' }}>Loading platform…</p>
      </div>

      <div style={{ width: '180px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '1px',
          background: 'var(--crimson)',
          width: `${progress}%`, transition: 'width 0.05s linear',
        }} />
      </div>
    </div>
  );
};

export default Loader2;
