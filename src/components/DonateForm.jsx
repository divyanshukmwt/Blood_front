import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../config/Axois';
import { toast } from 'react-toastify';
import { X, Droplets, CheckCircle } from 'lucide-react';

const DonateForm = ({ modal, dataId, modalfn, name }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  if (!modal) return null;

  const onSubmit = async (data) => {
    try {
      const res = await Axios.post('/donar/confirmDonate',{requestId:dataId,...data});
      if(res.status===200){toast.success('Donation confirmed! Thank you, hero.');reset();modalfn(false);}
    } catch { toast.error('Something went wrong.'); }
  };

  return (
    <div style={{ position:'fixed',inset:0,zIndex:1000,background:'rgba(15,13,12,0.6)',backdropFilter:'blur(6px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',animation:'fade-in 0.2s ease' }}
      onClick={e=>{if(e.target===e.currentTarget)modalfn(false);}}>
      <div style={{ background:'white',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'400px',animation:'fade-up 0.3s cubic-bezier(0.22,1,0.36,1)',position:'relative' }}>
        <button onClick={()=>modalfn(false)} style={{ position:'absolute',top:'20px',right:'20px',width:32,height:32,borderRadius:'50%',background:'var(--ash)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)' }}>
          <X size={14}/>
        </button>
        <div style={{ marginBottom:'16px',color:'var(--crimson)' }}><Droplets size={32} strokeWidth={1.5}/></div>
        <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.4rem',letterSpacing:'-0.02em',marginBottom:'6px' }}>Confirm Donation</h2>
        <p style={{ color:'var(--muted)',fontSize:'0.875rem',marginBottom:'28px' }}>You're donating to <strong>{name}</strong>. Please confirm your details.</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
          <div>
            <label style={{ display:'block',fontSize:'0.78rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'8px' }}>YOUR PHONE NUMBER</label>
            <input type="number" placeholder="10-digit number" {...register("number",{ required:true,minLength:10,maxLength:10 })}
              style={{ width:'100%',padding:'11px 16px',borderRadius:'10px',border:`1.5px solid ${errors.number?'var(--crimson)':'var(--border)'}`,background:'var(--ash)',fontSize:'0.95rem',outline:'none',fontFamily:'DM Sans, sans-serif' }}/>
          </div>
          <button type="submit" style={{ padding:'13px',borderRadius:'10px',background:'var(--success)',color:'white',border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.95rem',transition:'all 0.2s',boxShadow:'0 2px 12px rgba(13,122,78,0.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
            <CheckCircle size={16}/> Confirm Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
