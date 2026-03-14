import React from 'react';
import { ShieldOff } from 'lucide-react';

const BlockInterface = () => (
  <div style={{ background:'#FFF0F2',border:'1px solid rgba(192,21,42,0.3)',borderRadius:'16px',padding:'28px',display:'flex',alignItems:'flex-start',gap:'16px' }}>
    <div style={{ width:44,height:44,borderRadius:'50%',background:'var(--crimson-pale)',border:'1px solid rgba(192,21,42,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'var(--crimson)' }}>
      <ShieldOff size={20} strokeWidth={1.5}/>
    </div>
    <div>
      <h3 style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'1rem',color:'var(--crimson)',marginBottom:'6px' }}>Account Restricted</h3>
      <p style={{ color:'var(--ink-light)',fontSize:'0.875rem',lineHeight:1.6 }}>Your account has been temporarily restricted by an administrator. You cannot submit new blood requests at this time. Please contact support for assistance.</p>
    </div>
  </div>
);

export default BlockInterface;
