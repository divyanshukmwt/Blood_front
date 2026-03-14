import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight } from 'lucide-react';

const Maintanence = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh',background:'var(--ink)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px' }}>
      <div style={{ color:'var(--crimson)',marginBottom:'24px' }}><Wrench size={52} strokeWidth={1.5}/></div>
      <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(2rem, 4vw, 3rem)',color:'white',letterSpacing:'-0.02em',marginBottom:'16px' }}>Under Maintenance</h1>
      <p style={{ color:'rgba(255,255,255,0.5)',fontSize:'1rem',lineHeight:1.7,maxWidth:'400px',marginBottom:'32px' }}>We're working on improvements to make RedHope even better. We'll be back shortly.</p>
      <button onClick={()=>navigate('/')} style={{ padding:'14px 28px',borderRadius:'10px',background:'var(--crimson)',color:'white',border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,display:'inline-flex',alignItems:'center',gap:'8px' }}>
        Back to Home <ArrowRight size={16}/>
      </button>
    </div>
  );
};

export default Maintanence;
