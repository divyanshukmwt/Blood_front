import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await Axios.post("/users/login", { email: data.email, password: data.password });
      if (res.status === 200) {
        const payload = res.data.user || res.data;
        setUser(payload);
        if (res.data.token) {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("token", res.data.token);
        }
        navigate("/");
        toast.success("Welcome back!");
      }
    } catch {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--ash)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Left panel - hidden on mobile */}
      <div style={{
        width: '480px', minHeight: '600px',
        background: 'var(--ink)',
        borderRadius: '24px 0 0 24px',
        padding: '64px 48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }} className="auth-left">
        <div style={{
          position: 'absolute', top: '-40%', right: '-20%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,21,42,0.2) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '3rem', marginBottom: '24px' }}>🩸</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.25rem', color: 'white', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
            Welcome back, Hero
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '40px' }}>
            Your next donation could save up to three lives. Sign in to check new requests from people who need you.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[{ v: '10K+', l: 'Donors' }, { v: '98%', l: 'Match rate' }].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'white' }}>{s.v}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{
        width: '440px', minHeight: '600px',
        background: 'white',
        borderRadius: '0 24px 24px 0',
        padding: '64px 48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }} className="auth-right">
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '32px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/></svg>
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>
              Red<span style={{ color: 'var(--crimson)' }}>Hope</span>
            </span>
          </Link>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>Sign in</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--crimson)', fontWeight: 600, textDecoration: 'none' }}>Register free</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', letterSpacing: '0.04em' }}>EMAIL</label>
            <input
              {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '10px',
                border: `1.5px solid ${errors.email ? 'var(--crimson)' : 'var(--border)'}`,
                background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.email ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.email && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '6px' }}>{errors.email.message}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px', letterSpacing: '0.04em' }}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <input
                {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
                type={show ? "text" : "password"}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 48px 12px 16px', borderRadius: '10px',
                  border: `1.5px solid ${errors.password ? 'var(--crimson)' : 'var(--border)'}`,
                  background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                onBlur={e => e.target.style.borderColor = errors.password ? 'var(--crimson)' : 'var(--border)'}
              />
              <button type="button" onClick={() => setShow(!show)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
                fontSize: '1rem', display: 'flex', alignItems: 'center',
              }}>
                {show ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '6px' }}>{errors.password.message}</p>}
          </div>

          <div style={{ textAlign: 'right' }}>
            <Link to="/forget-password" style={{ color: 'var(--muted)', fontSize: '0.82rem', textDecoration: 'none' }}>Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '14px', borderRadius: '10px',
            background: loading ? 'var(--muted)' : 'var(--crimson)',
            color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
            transition: 'all 0.2s',
            marginTop: '8px',
          }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .auth-left { display: none !important; }
          .auth-right { border-radius: 20px !important; width: 100% !important; max-width: 440px; padding: 40px 28px !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
