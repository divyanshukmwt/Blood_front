import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Axios from "../config/Axois";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await Axios.post("/users/forget-password", { email: data.email });
      setSent(true);
      toast.success("Reset link sent!");
    } catch {
      toast.error("Email not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ash)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: 'white', borderRadius: '24px', padding: '56px 40px', boxShadow: 'var(--card-shadow)' }}>
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '32px' }}>
          ← Back to sign in
        </Link>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📧</div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.5rem', marginBottom: '12px' }}>Check your email</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>We've sent a password reset link to your email address. It may take a few minutes to arrive.</p>
          </div>
        ) : (
          <>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>Reset password</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '32px' }}>Enter your email and we'll send you a reset link.</p>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>EMAIL</label>
                <input
                  {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
                  type="email" placeholder="you@example.com"
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: `1.5px solid ${errors.email ? 'var(--crimson)' : 'var(--border)'}`,
                    background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                  onBlur={e => e.target.style.borderColor = errors.email ? 'var(--crimson)' : 'var(--border)'}
                />
                {errors.email && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.email.message}</p>}
              </div>
              <button type="submit" disabled={loading} style={{
                padding: '14px', borderRadius: '10px',
                background: loading ? 'var(--muted)' : 'var(--crimson)',
                color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.95rem',
              }}>
                {loading ? 'Sending…' : 'Send reset link →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
