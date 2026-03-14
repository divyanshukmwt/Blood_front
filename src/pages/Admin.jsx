import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import AdminProfilePic from "../components/AdminProfilePic";
import { AdminContext } from '../context/admin.context';
import AdminAxios from "../config/AdminAxios";
import { receiveMessage, sendMessage } from '../config/Socket';
import SelectBox from '../components/SelectBox';
import { Link } from "react-router-dom";
import { Users, Droplets, Ticket, Pencil, Wifi, WifiOff, UserSearch, TicketCheck } from 'lucide-react';

const DELAY_LABELS = {60:'60s',120:'2 min',300:'5 min',600:'10 min',1800:'30 min',3600:'1 hr'};

const StatWidget = ({ Icon, label, value, sub }) => (
  <div style={{ background:'white',borderRadius:'16px',padding:'24px',border:'1px solid var(--border)',display:'flex',alignItems:'flex-start',gap:'16px' }}>
    <div style={{ width:44,height:44,borderRadius:'12px',background:'var(--crimson-pale)',border:'1px solid rgba(192,21,42,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'var(--crimson)' }}>
      <Icon size={20} strokeWidth={1.5}/>
    </div>
    <div>
      <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'4px' }}>{label}</p>
      <p style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.75rem',lineHeight:1 }}>{value??'—'}</p>
      {sub && <p style={{ fontSize:'0.8rem',color:'var(--muted)',marginTop:'4px' }}>{sub}</p>}
    </div>
  </div>
);

const Admin = () => {
  const [picModal, setPicModal] = useState(false);
  const { admin, setAdmin } = useContext(AdminContext);
  const [adminDets, setAdminDets] = useState(admin);
  const [counts, setCounts] = useState({});
  const [time, setTime] = useState('');

  useEffect(()=>{setAdminDets(admin);},[admin]);
  useEffect(()=>{AdminAxios.post("/admin/allcounts").then(r=>setCounts(r.data)).catch(console.log);},[]);
  useEffect(()=>{receiveMessage("server-res",data=>{setAdmin(data);setAdminDets(data);});},[]);
  useEffect(()=>{setTime(DELAY_LABELS[admin.delayTimer]||'');},[admin.delayTimer]);

  const serverHandel = ()=>sendMessage("server-req",adminDets.email);
  const serverOn = adminDets?.serverOnOff===true;

  return (
    <div style={{ background:'var(--ash)',minHeight:'100vh' }}>
      <Navbar field={[{link:"/",name:"Home"},{link:"/donate/request-list",name:"Donate"},{link:"/reciver/blood",name:"Blood"},{link:"/about",name:"About"},{link:"/adminLogout",name:"Logout"}]}/>
      {picModal && <AdminProfilePic fn={setPicModal} email={adminDets.email}/>}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'96px 24px 48px' }}>

        {/* Admin Header */}
        <div style={{ background:'var(--ink)',borderRadius:'24px',padding:'40px',marginBottom:'28px',display:'flex',gap:'28px',alignItems:'center',flexWrap:'wrap',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:'-50%',right:'-10%',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(192,21,42,0.2) 0%,transparent 70%)',pointerEvents:'none' }}/>
          <div style={{ position:'relative',flexShrink:0,zIndex:1 }}>
            <div style={{ width:88,height:88,borderRadius:'50%',overflow:'hidden',border:'3px solid rgba(255,255,255,0.2)' }}>
              <img src={`data:${adminDets.pictype};base64,${adminDets.profilepic}`} alt="Admin" style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
            </div>
            <button onClick={()=>setPicModal(!picModal)} style={{ position:'absolute',bottom:-2,right:-2,width:28,height:28,borderRadius:'50%',background:'var(--crimson)',border:'2px solid var(--ink)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <Pencil size={11} color="white" strokeWidth={2.5}/>
            </button>
          </div>
          <div style={{ zIndex:1 }}>
            <p style={{ fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',marginBottom:'4px' }}>ADMIN PANEL</p>
            <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.75rem',color:'white',letterSpacing:'-0.02em',marginBottom:'4px' }}>{admin.name}</h1>
            <p style={{ color:'rgba(255,255,255,0.5)',fontSize:'0.9rem',marginBottom:'16px' }}>{admin.email}</p>
            <button onClick={serverHandel} style={{ padding:'10px 20px',borderRadius:'10px',background:serverOn?'rgba(13,122,78,0.2)':'rgba(192,21,42,0.2)',border:`1px solid ${serverOn?'rgba(13,122,78,0.4)':'rgba(192,21,42,0.4)'}`,color:serverOn?'#5AE0A0':'#F08090',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.875rem',transition:'all 0.2s',display:'flex',alignItems:'center',gap:'8px' }}>
              {serverOn ? <Wifi size={14}/> : <WifiOff size={14}/>}
              Server: {serverOn?'Online':'Offline'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'16px',marginBottom:'28px' }}>
          <StatWidget Icon={Users}   label="Total Users"     value={counts.UserCount}    sub={counts.UserCount>1?'registered users':'registered user'}/>
          <StatWidget Icon={Droplets} label="Blood Requests" value={counts.requestCount}  sub="all time"/>
          <StatWidget Icon={Ticket}  label="Tickets Raised"  value={counts.ticketCounst}  sub="support tickets"/>
        </div>

        {/* Controls */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'28px' }} className="admin-controls">
          <div style={{ background:'white',borderRadius:'20px',padding:'28px',border:'1px solid var(--border)' }}>
            <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'1.1rem',marginBottom:'20px' }}>Quick Actions</h2>
            <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
              <Link to="/allUsers" style={{ display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',borderRadius:'10px',background:'var(--ash)',border:'1px solid var(--border)',textDecoration:'none',color:'var(--ink)',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.9rem',transition:'all 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='var(--crimson-pale)'} onMouseLeave={e=>e.currentTarget.style.background='var(--ash)'}>
                <UserSearch size={16} color="var(--crimson)"/> View All Users
              </Link>
              <Link to="/ticket-raiser" style={{ display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',borderRadius:'10px',background:'var(--ash)',border:'1px solid var(--border)',textDecoration:'none',color:'var(--ink)',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.9rem',transition:'all 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='var(--crimson-pale)'} onMouseLeave={e=>e.currentTarget.style.background='var(--ash)'}>
                <TicketCheck size={16} color="var(--crimson)"/> Manage Tickets
              </Link>
            </div>
          </div>
          <div style={{ background:'white',borderRadius:'20px',padding:'28px',border:'1px solid var(--border)' }}>
            <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'1.1rem',marginBottom:'8px' }}>Request Delay Timer</h2>
            <p style={{ color:'var(--muted)',fontSize:'0.85rem',marginBottom:'20px' }}>Currently set to: <strong style={{ color:'var(--crimson)' }}>{time||'—'}</strong></p>
            <SelectBox option={["60s","2min","5min","10min","30min","1hr"]}/>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:767px){.admin-controls{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};

export default Admin;
