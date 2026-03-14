import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, MapPin } from 'lucide-react';

const STATUS_STYLES = {
  pending:  { color:'#B85C00',Icon:Clock,        label:'Pending'  },
  Accepted: { color:'#0D7A4E',Icon:CheckCircle2, label:'Accepted' },
};

const Stricks = ({ bloodGroup, date, time, status, id }) => {
  const navigate = useNavigate();
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const StatusIcon = s.Icon;
  return (
    <div style={{ display:'flex',alignItems:'center',gap:'16px',padding:'14px 16px',borderRadius:'12px',background:'var(--ash)',border:'1px solid var(--border)',transition:'all 0.2s' }}
      onMouseEnter={e=>e.currentTarget.style.background='var(--crimson-pale)'}
      onMouseLeave={e=>e.currentTarget.style.background='var(--ash)'}
    >
      <div style={{ width:44,height:44,borderRadius:'10px',background:'var(--crimson)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
        <span style={{ fontFamily:'Syne',fontWeight:800,color:'white',fontSize:'0.85rem' }}>{bloodGroup}</span>
      </div>
      <div style={{ flex:1,minWidth:0 }}>
        <p style={{ fontWeight:600,fontSize:'0.85rem',color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{date} · {time}</p>
        <div style={{ display:'flex',alignItems:'center',gap:'4px',marginTop:'2px',color:s.color }}>
          <StatusIcon size={11} strokeWidth={2.5}/> <span style={{ fontSize:'0.75rem',fontWeight:700 }}>{s.label}</span>
        </div>
      </div>
      <button onClick={()=>navigate(`/map/${id}`)} style={{ padding:'6px 12px',borderRadius:'8px',background:'white',border:'1px solid var(--border)',color:'var(--ink)',cursor:'pointer',fontSize:'0.75rem',fontWeight:600,flexShrink:0,transition:'all 0.2s',fontFamily:'DM Sans, sans-serif',display:'flex',alignItems:'center',gap:'5px' }}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--ink)';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='var(--ink)';}}
        onMouseLeave={e=>{e.currentTarget.style.background='white';e.currentTarget.style.color='var(--ink)';e.currentTarget.style.borderColor='var(--border)';}}
      >
        <MapPin size={11}/> Map
      </button>
    </div>
  );
};

export default Stricks;
