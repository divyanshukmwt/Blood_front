import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh',background:'var(--ink)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'24px',position:'relative',overflow:'hidden' }}>
      <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(192,21,42,0.12) 0%,transparent 70%)' }}/>
      <div style={{ position:'relative',zIndex:1 }}>
        <p style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(5rem, 15vw, 10rem)',color:'rgba(255,255,255,0.06)',lineHeight:1 }}>404</p>
        <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(1.5rem, 3vw, 2rem)',color:'white',letterSpacing:'-0.02em',marginBottom:'12px',marginTop:'-20px' }}>Page not found</h1>
        <p style={{ color:'rgba(255,255,255,0.45)',marginBottom:'36px',fontSize:'0.95rem' }}>Looks like this page doesn't exist anymore.</p>
        <button onClick={()=>navigate('/')} style={{ padding:'14px 28px',borderRadius:'10px',background:'var(--crimson)',color:'white',border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.95rem',boxShadow:'0 4px 24px rgba(192,21,42,0.4)',transition:'all 0.2s',display:'inline-flex',alignItems:'center',gap:'8px' }}>
          Back to Home <ArrowRight size={16}/>
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
