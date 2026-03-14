import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";

const Form = ({ fn }) => {
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await Axios.post("/users/alldets", data);
      setUser(res.data);
      fn(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const inputStyle = (hasErr) => ({
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: `1.5px solid ${hasErr ? 'var(--crimson)' : 'var(--border)'}`,
    background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(15,13,12,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '40px',
        width: '100%', maxWidth: '540px',
        animation: 'fade-up 0.35s cubic-bezier(0.22,1,0.36,1) both',
        boxShadow: '0 24px 80px rgba(15,13,12,0.3)',
      }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>Complete your profile</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>We need a few more details before you can get started.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid">
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Phone Number</label>
              <input {...register("number", { required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="10-digit number" style={inputStyle(errors.number)}
                onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                onBlur={e => e.target.style.borderColor = errors.number ? 'var(--crimson)' : 'var(--border)'}
              />
              {errors.number && <p style={{ color: 'var(--crimson)', fontSize: '0.75rem', marginTop: '4px' }}>Valid 10-digit number required</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Emergency Number</label>
              <input {...register("emargencyNumber", { required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="Emergency contact" style={inputStyle(errors.emargencyNumber)}
                onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                onBlur={e => e.target.style.borderColor = errors.emargencyNumber ? 'var(--crimson)' : 'var(--border)'}
              />
              {errors.emargencyNumber && <p style={{ color: 'var(--crimson)', fontSize: '0.75rem', marginTop: '4px' }}>Required</p>}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Address / City</label>
            <input {...register("address", { required: true, minLength: 5 })} type="text" placeholder="Your city or address" style={inputStyle(errors.address)}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.address ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.address && <p style={{ color: 'var(--crimson)', fontSize: '0.75rem', marginTop: '4px' }}>Address is required</p>}
          </div>
          <button type="submit" style={{
            padding: '14px', borderRadius: '10px',
            background: 'var(--crimson)', color: 'white', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.95rem', marginTop: '8px',
          }}>Save Profile →</button>
        </form>
      </div>
      <style>{`@media(max-width:480px){.form-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};

export default Form;
