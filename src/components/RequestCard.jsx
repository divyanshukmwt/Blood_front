import React from 'react';

const RequestCard = ({ data, user }) => {
  const isPending = data.status === "pending";

  return (
    <div style={{
      background: 'white', borderRadius: '20px',
      border: '1px solid var(--border)',
      padding: '24px',
      transition: 'all 0.3s',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'transparent'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {/* Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border)', background: 'var(--ash)', flexShrink: 0 }}>
          {user?.profilepic && user?.pictype ? (
            <img src={`data:${user.pictype};base64,${user.profilepic}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontFamily: 'Syne', fontWeight: 800, fontSize: '1.25rem' }}>{user?.name?.[0]?.toUpperCase()}</span>
            </div>
          )}
        </div>
        <span style={{
          padding: '5px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700,
          background: isPending ? '#FFF8E6' : '#F0FFF4',
          color: isPending ? '#B85C00' : '#0D7A4E',
          border: `1px solid ${isPending ? '#FFE0A0' : '#B2F5C8'}`,
        }}>
          {isPending ? '⏳ Pending' : '✅ Accepted'}
        </span>
      </div>

      {/* Name & blood */}
      <div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>{user?.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.5rem', color: 'var(--crimson)' }}>{data.bloodType}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>blood type</span>
        </div>
      </div>

      {/* Date/time */}
      <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--muted)' }}>
          <span>📅</span>{data.date}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--muted)' }}>
          <span>⏰</span>{data.time}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
