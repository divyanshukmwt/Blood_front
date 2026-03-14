import React, { useState } from 'react';
import AdminAxios from '../config/AdminAxios';
import { toast } from 'react-toastify';
import { Droplets, Heart, ShieldOff, ShieldCheck } from 'lucide-react';

const UserCard = ({ user }) => {
  const [blocked, setBlocked] = useState(user.block);
  const [loading, setLoading] = useState(false);

  const toggleBlock = async () => {
    setLoading(true);
    try {
      await AdminAxios.post(blocked?'/admin/unblockUser':'/admin/blockUser',{userId:user._id});
      setBlocked(!blocked);
      toast.success(`User ${blocked?'unblocked':'blocked'} successfully`);
    } catch { toast.error("Action failed"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ background:'white',borderRadius:'16px',padding:'20px',border:`1px solid ${blocked?'rgba(192,21,42,0.2)':'var(--border)'}`,transition:'all 0.3s',display:'flex',flexDirection:'column',gap:'14px' }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--card-shadow-hover)';e.currentTarget.style.transform='translateY(-2px)';}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none';}}
    >
      <div style={{ display:'flex',alignItems:'center',gap:'12px' }}>
        <div style={{ width:48,height:48,borderRadius:'50%',overflow:'hidden',border:'2px solid var(--border)',background:'var(--ash)',flexShrink:0 }}>
          {user?.profilepic
            ? <img src={`data:${user.pictype};base64,${user.profilepic}`} alt={user.name} style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
            : <div style={{ width:'100%',height:'100%',background:'var(--crimson)',display:'flex',alignItems:'center',justifyContent:'center' }}><span style={{ fontFamily:'Syne',fontWeight:800,color:'white',fontSize:'1.1rem' }}>{user.name?.[0]||'?'}</span></div>
          }
        </div>
        <div style={{ flex:1,minWidth:0 }}>
          <p style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'0.95rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{user.name}</p>
          <p style={{ fontSize:'0.75rem',color:'var(--muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{user.email}</p>
        </div>
        <span style={{ padding:'3px 10px',borderRadius:'100px',background:'var(--crimson-pale)',border:'1px solid rgba(192,21,42,0.2)',color:'var(--crimson)',fontWeight:700,fontSize:'0.75rem',flexShrink:0 }}>{user.bloodgroup}</span>
      </div>

      <div style={{ display:'flex',gap:'8px' }}>
        <div style={{ flex:1,background:'var(--ash)',borderRadius:'8px',padding:'10px',textAlign:'center' }}>
          <div style={{ display:'flex',justifyContent:'center',marginBottom:'3px',color:'var(--crimson)' }}><Droplets size={13}/></div>
          <p style={{ fontFamily:'Syne',fontWeight:800,fontSize:'1.1rem' }}>{user?.Donate?.length??0}</p>
          <p style={{ fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.06em',textTransform:'uppercase' }}>Donations</p>
        </div>
        <div style={{ flex:1,background:'var(--ash)',borderRadius:'8px',padding:'10px',textAlign:'center' }}>
          <div style={{ display:'flex',justifyContent:'center',marginBottom:'3px',color:'var(--crimson)' }}><Heart size={13}/></div>
          <p style={{ fontFamily:'Syne',fontWeight:800,fontSize:'1.1rem' }}>{user?.bloodRequest?.length??0}</p>
          <p style={{ fontSize:'0.65rem',color:'var(--muted)',letterSpacing:'0.06em',textTransform:'uppercase' }}>Requests</p>
        </div>
      </div>

      <button onClick={toggleBlock} disabled={loading} style={{ padding:'10px',borderRadius:'10px',background:blocked?'white':'#FFF0F2',border:`1.5px solid ${blocked?'var(--border)':'rgba(192,21,42,0.3)'}`,color:blocked?'var(--success)':'var(--crimson)',cursor:loading?'not-allowed':'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.82rem',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px' }}>
        {loading ? '…' : blocked ? <><ShieldCheck size={13}/> Unblock User</> : <><ShieldOff size={13}/> Block User</>}
      </button>
    </div>
  );
};

export default UserCard;
