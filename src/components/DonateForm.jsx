import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../config/Axois';
import { toast } from 'react-toastify';

const DonateForm = ({ modal, dataId, modalfn, name }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await Axios.post('/donar/donate', { ...data, requestId: dataId });
      toast.success('Donation confirmed! Thank you 🩸');
      modalfn(false);
      reset();
    } catch {
      toast.error('Something went wrong');
    }
  };

  if (!modal) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(15,13,12,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', animation: 'fade-in 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) modalfn(false); }}>
      <div style={{
        background: 'white', borderRadius: '24px',
        padding: '40px', width: '100%', maxWidth: '440px',
        animation: 'fade-up 0.3s cubic-bezier(0.22,1,0.36,1) both',
        boxShadow: '0 24px 80px rgba(15,13,12,0.25)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Confirm Donation</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '2px' }}>Donating to <strong>{name}</strong></p>
          </div>
          <button onClick={() => modalfn(false)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ash)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Your Contact Number</label>
            <input
              {...register("number", { required: true, minLength: 10, maxLength: 10 })}
              type="number" placeholder="10-digit phone number" maxLength={10}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '10px',
                border: `1.5px solid ${errors.number ? 'var(--crimson)' : 'var(--border)'}`,
                background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.number ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.number && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>Valid 10-digit number required</p>}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', background: 'var(--crimson-pale)', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(192,21,42,0.12)' }}>
            🩸 Your number will be shared with the recipient so they can coordinate.
          </p>
          <button type="submit" style={{
            padding: '14px', borderRadius: '10px',
            background: 'var(--success)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.95rem',
            marginTop: '4px', transition: 'all 0.2s',
          }}>
            ✓ Confirm Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
