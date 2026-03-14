import React, { useState } from 'react';
import AdminAxios from '../config/AdminAxios';
import { toast } from 'react-toastify';

const UserCard = ({ user }) => {
  const [blocked, setBlocked] = useState(user.block);
  const [loading, setLoading] = useState(false);

  const toggleBlock = async () => {
    setLoading(true);
    try {
      await AdminAxios.post('/admin/blockUser', { email: user.email, block: !blocked });
      setBlocked(!blocked);
      toast.success(blocked ? 'User unblocked' : 'User blocked');
    } catch { toast.error('Action failed'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{
      background: 'white', borderRadius: '16px',
      border: `1px solid ${blocked ? '#FFCDD2' : 'var(--border)'}`,
      padding: '20px',
      transition: 'all 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', background: 'var(--ash)', flexShrink: 0 }}>
          {user.profilepic && user.pictype ? (
            <img src={`data:${user.pictype};base64,${user.profilepic}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontFamily: 'Syne', fontWeight: 800 }}>{user.name?.[0]?.toUpperCase()}</span>
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.95rem', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</h4>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
        </div>
        <span style={{
          padding: '4px 8px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700,
          background: `${user.bloodgroup ? 'var(--crimson-pale)' : 'var(--ash)'}`,
          color: user.bloodgroup ? 'var(--crimson)' : 'var(--muted)',
          flexShrink: 0,
        }}>{user.bloodgroup || '—'}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span>🩸 {user.Donate?.length || 0} donations</span>
        <span>•</span>
        <span>📋 {user.bloodRequest?.length || 0} requests</span>
        {user.verified && <><span>•</span><span style={{ color: '#1D9BF0' }}>✅ Verified</span></>}
      </div>

      <button onClick={toggleBlock} disabled={loading} style={{
        width: '100%', padding: '9px', borderRadius: '8px',
        border: `1px solid ${blocked ? '#FFCDD2' : 'var(--border)'}`,
        background: blocked ? '#FFF0F0' : 'var(--ash)',
        color: blocked ? 'var(--crimson)' : 'var(--muted)',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: 'DM Sans', fontWeight: 600, fontSize: '0.82rem',
        transition: 'all 0.2s',
      }}>
        {loading ? '…' : blocked ? '🔓 Unblock User' : '🔒 Block User'}
      </button>
    </div>
  );
};

export default UserCard;
