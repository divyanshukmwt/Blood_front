import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

const STATUS_STYLES = {
  pending:  { bg:'#FFFBEA',border:'rgba(184,92,0,0.2)', color:'#B85C00',Icon:Clock,        label:'Pending'  },
  Accepted: { bg:'#F0FDF4',border:'rgba(13,122,78,0.2)', color:'#0D7A4E',Icon:CheckCircle2, label:'Accepted' },
};

const RequestCard = ({ data, user }) => {
  const status = STATUS_STYLES[data.status] || STATUS_STYLES.pending;
  const StatusIcon = status.Icon;
  return (
    <div style={{ background:'white',borderRadius:'16px',border:'1px solid var(--border)',padding:'24px',transition:'all 0.3s',display:'flex',flexDirection:'column',gap:'16px' }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--card-shadow-hover)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor='transparent';}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='var(--border)';}}
    >
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'12px' }}>
          <div style={{ width:44,height:44,borderRadius:'50%',overflow:'hidden',border:'2px solid var(--border)',background:'var(--ash)',flexShrink:0 }}>
            {user?.profilepic
              ? <img src={`data:${user.pictype};base64,${user.profilepic}`} alt="Profile" style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
              : <div style={{ width:'100%',height:'100%',background:'var(--crimson)',display:'flex',alignItems:'center',justifyContent:'center' }}><span style={{ fontFamily:'Syne',fontWeight:800,color:'white',fontSize:'1rem' }}>{user?.name?.[0]||'?'}</span></div>
            }
          </div>
          <div>
            <p style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'0.95rem' }}>{user?.name}</p>
            <p style={{ fontSize:'0.75rem',color:'var(--muted)' }}>My request</p>
          </div>
        </div>
        <div style={{ padding:'5px 12px',borderRadius:'100px',background:status.bg,border:`1px solid ${status.border}`,color:status.color,fontSize:'0.78rem',fontWeight:700,display:'flex',alignItems:'center',gap:'5px' }}>
          <StatusIcon size={12}/> {status.label}
        </div>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',background:'var(--ash)',borderRadius:'10px',padding:'14px' }}>
        <div><p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'3px' }}>BLOOD TYPE</p><p style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.25rem',color:'var(--crimson)' }}>{data.bloodType}</p></div>
        <div><p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'3px' }}>DATE</p><p style={{ fontWeight:600,fontSize:'0.875rem' }}>{data.date}</p></div>
        <div style={{ gridColumn:'1 / -1' }}><p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'3px' }}>TIME</p><p style={{ fontWeight:600,fontSize:'0.875rem' }}>{data.time}</p></div>
      </div>
    </div>
  );
};

export default RequestCard;
