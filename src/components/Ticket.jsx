import React from 'react';

const Ticket = ({ data }) => (
  <div style={{
    background: 'white', borderRadius: '16px', padding: '24px',
    border: '1px solid var(--border)',
    transition: 'all 0.3s',
    display: 'flex', flexDirection: 'column', gap: '12px',
  }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'transparent'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
  >
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '10px',
        background: 'var(--crimson-pale)', border: '1px solid rgba(192,21,42,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', flexShrink: 0,
      }}>🎫</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {data.ticketTitle}
        </h3>
        <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{data.date} · {data.time}</p>
      </div>
    </div>

    {/* Description */}
    <div style={{ background: 'var(--ash)', borderRadius: '10px', padding: '14px' }}>
      <p style={{ color: 'var(--ink-light)', fontSize: '0.875rem', lineHeight: 1.65 }}>
        {data.ticketDescription}
      </p>
    </div>
  </div>
);

export default Ticket;
