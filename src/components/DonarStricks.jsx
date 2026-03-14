import React from 'react';
import { Heart } from 'lucide-react';

const DonarStricks = ({ bloodGroup, date, time }) => (
  <div style={{ display:'flex',alignItems:'center',gap:'16px',padding:'14px 16px',borderRadius:'12px',background:'var(--ash)',border:'1px solid var(--border)',transition:'all 0.2s' }}
    onMouseEnter={e=>e.currentTarget.style.background='#F0FDF4'}
    onMouseLeave={e=>e.currentTarget.style.background='var(--ash)'}
  >
    <div style={{ width:44,height:44,borderRadius:'10px',background:'var(--success)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
      <span style={{ fontFamily:'Syne',fontWeight:800,color:'white',fontSize:'0.85rem' }}>{bloodGroup}</span>
    </div>
    <div style={{ flex:1,minWidth:0 }}>
      <p style={{ fontWeight:600,fontSize:'0.85rem',color:'var(--ink)' }}>{date} · {time}</p>
      <div style={{ display:'flex',alignItems:'center',gap:'4px',marginTop:'2px',color:'var(--success)' }}>
        <Heart size={11} strokeWidth={2.5}/> <span style={{ fontSize:'0.75rem',fontWeight:700 }}>Donated</span>
      </div>
    </div>
  </div>
);

export default DonarStricks;
