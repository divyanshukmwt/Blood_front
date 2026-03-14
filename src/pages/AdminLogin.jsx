import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { AdminContext } from "../context/admin.context";
import AdminAxios from "../config/AdminAxios";
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await AdminAxios.post("/admin/login", { email: data.email, password: data.password });
      setAdmin(res.data.admin);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
      toast.success("Admin access granted.");
    } catch {
      toast.error("Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--ink)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,21,42,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(192,21,42,0.2)', border: '1px solid rgba(192,21,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--crimson-light)">
              <path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Admin Access</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Restricted zone — authorized personnel only</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>EMAIL</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                type="email" placeholder="admin@redhope.in"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: `1.5px solid ${errors.email ? 'var(--crimson)' : 'rgba(255,255,255,0.15)'}`,
                  background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: '0.95rem', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--crimson-light)'}
                onBlur={e => e.target.style.borderColor = errors.email ? 'var(--crimson)' : 'rgba(255,255,255,0.15)'}
              />
              {errors.email && <p style={{ color: 'var(--crimson-light)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.email.message}</p>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  {...register("password", { required: "Password is required" })}
                  type={show ? "text" : "password"} placeholder="••••••••"
                  style={{
                    width: '100%', padding: '12px 48px 12px 16px', borderRadius: '10px',
                    border: `1.5px solid ${errors.password ? 'var(--crimson)' : 'rgba(255,255,255,0.15)'}`,
                    background: 'rgba(255,255,255,0.07)', color: 'white', fontSize: '0.95rem', outline: 'none',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--crimson-light)'}
                  onBlur={e => e.target.style.borderColor = errors.password ? 'var(--crimson)' : 'rgba(255,255,255,0.15)'}
                />
                <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p style={{ color: 'var(--crimson-light)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '14px', borderRadius: '10px',
              background: loading ? 'rgba(255,255,255,0.1)' : 'var(--crimson)',
              color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
              marginTop: '8px', transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(192,21,42,0.4)',
            }}>
              {loading ? 'Authenticating…' : 'Access Dashboard →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: '24px' }}>
          <Link to="/login" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← Back to user login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
