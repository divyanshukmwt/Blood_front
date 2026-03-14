import React from 'react';
import Axios from '../config/Axois';
import { toast } from 'react-toastify';

const Stricks = ({ bloodGroup, date, time, status, id }) => {
  const isPending = status === 'pending';

  const handleDelete = async () => {
    try {
      await Axios.delete(`/users/deleteRequest/${id}`);
      toast.success('Request deleted');
    } catch { toast.error('Could not delete'); }
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px', borderRadius: '12px',
      background: 'var(--ash)', border: '1px solid var(--border)',
      transition: 'all 0.2s', gap: '12px', flexWrap: 'wrap',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem',
          color: 'var(--crimson)', minWidth: '36px',
        }}>{bloodGroup}</span>
        <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
          <span>{date}</span>
          <span style={{ margin: '0 6px' }}>·</span>
          <span>{time}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          padding: '4px 10px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
          background: isPending ? '#FFF8E6' : '#F0FFF4',
          color: isPending ? '#B85C00' : '#0D7A4E',
          border: `1px solid ${isPending ? '#FFE0A0' : '#B2F5C8'}`,
        }}>{isPending ? '⏳ Pending' : '✅ Accepted'}</span>
        <button onClick={handleDelete} style={{
          width: 28, height: 28, borderRadius: '50%', background: 'var(--crimson-pale)',
          border: '1px solid rgba(192,21,42,0.2)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson-pale)'}
          title="Delete"
        >×</button>
      </div>
    </div>
  );
};

export default Stricks;
