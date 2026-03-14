import React from 'react';

const Scales = ({ text, count, para, center, className }) => (
  <div style={{ textAlign: center === false ? 'left' : 'center' }}>
    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: 'var(--ink)', lineHeight: 1 }}>{count ?? 0}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{text}</div>
    <div style={{ fontSize: '0.8rem', color: 'var(--crimson)', marginTop: '2px' }}>{para}</div>
  </div>
);

export default Scales;
