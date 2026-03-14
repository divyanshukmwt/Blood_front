import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../config/Axois';
import { toast } from 'react-toastify';
import { KeyRound, ArrowLeft, ArrowRight } from 'lucide-react';

const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await Axios.post('/users/forgetPassword', { email: data.email });
      if (res.status === 200) { toast.success('Reset link sent! Check your email.'); navigate('/login'); }
    } catch { toast.error('Email not found.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh',background:'var(--ash)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px' }}>
      <div style={{ width:'100%',maxWidth:'400px',background:'white',borderRadius:'24px',padding:'48px 40px',boxShadow:'var(--card-shadow)' }}>
        <Link to="/login" style={{ display:'inline-flex',alignItems:'center',gap:'6px',textDecoration:'none',color:'var(--muted)',fontSize:'0.85rem',marginBottom:'32px' }}>
          <ArrowLeft size={14}/> Back to sign in
        </Link>
        <div style={{ marginBottom:'20px',color:'var(--crimson)' }}><KeyRound size={36} strokeWidth={1.5}/></div>
        <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.75rem',letterSpacing:'-0.02em',marginBottom:'8px' }}>Reset password</h1>
        <p style={{ color:'var(--muted)',fontSize:'0.9rem',marginBottom:'32px' }}>Enter your email and we'll send you a reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
          <div>
            <label style={{ display:'block',fontSize:'0.8rem',fontWeight:600,letterSpacing:'0.04em',marginBottom:'8px' }}>EMAIL ADDRESS</label>
            <input {...register('email',{ required:'Email is required',pattern:{ value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'Invalid email' } })}
              type="email" placeholder="you@example.com"
              style={{ width:'100%',padding:'12px 16px',borderRadius:'10px',border:`1.5px solid ${errors.email?'var(--crimson)':'var(--border)'}`,background:'var(--ash)',fontSize:'0.95rem',outline:'none',fontFamily:'DM Sans, sans-serif',transition:'border-color 0.2s' }}
              onFocus={e=>e.target.style.borderColor='var(--crimson)'}
              onBlur={e=>e.target.style.borderColor=errors.email?'var(--crimson)':'var(--border)'}
            />
            {errors.email && <p style={{ color:'var(--crimson)',fontSize:'0.78rem',marginTop:'5px' }}>{errors.email.message}</p>}
          </div>
          <button type="submit" disabled={loading} style={{ padding:'14px',borderRadius:'10px',background:loading?'var(--muted)':'var(--crimson)',color:'white',border:'none',cursor:loading?'not-allowed':'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.95rem',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
            {loading?'Sending…':<><span>Send reset link</span><ArrowRight size={16}/></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
