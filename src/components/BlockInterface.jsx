import React from 'react';

const BlockInterface = () => (
  <div style={{
    background: '#FFF0F0', border: '1px solid #FFCDD2',
    borderRadius: '20px', padding: '28px 32px',
    display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
  }}>
    <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(192,21,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
      🚫
    </div>
    <div>
      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', color: 'var(--crimson)', marginBottom: '4px' }}>Account Restricted</h3>
      <p style={{ color: '#7B2D37', fontSize: '0.875rem', lineHeight: 1.6 }}>
        Your account has been temporarily restricted from posting blood requests. Please contact the admin for more information.
      </p>
    </div>
  </div>
);

export default BlockInterface;
