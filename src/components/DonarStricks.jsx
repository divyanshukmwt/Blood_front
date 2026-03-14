import React from 'react';

const DonarStricks = ({ bloodGroup, date, time, id }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 16px', borderRadius: '12px',
    background: 'var(--ash)', border: '1px solid var(--border)',
    gap: '12px', flexWrap: 'wrap',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/></svg>
      </div>
      <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', color: 'var(--crimson)' }}>{bloodGroup}</span>
      <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
        <span>{date}</span>
        <span style={{ margin: '0 6px' }}>·</span>
        <span>{time}</span>
      </div>
    </div>
    <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, background: '#F0FFF4', color: '#0D7A4E', border: '1px solid #B2F5C8' }}>
      ✅ Donated
    </span>
  </div>
);

export default DonarStricks;
