import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";
import { toast } from "react-toastify";
import AbandonWord from "../utils/AbandonWord";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await Axios.post("/users/register", data);
      if (res.status === 201) {
        setUser(res.data.user || res.data);
        navigate("/login");
        toast.success("Account created! Please sign in.");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: `1.5px solid ${hasError ? 'var(--crimson)' : 'var(--border)'}`,
    background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ash)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{
        width: '100%', maxWidth: '520px',
        background: 'white', borderRadius: '24px',
        padding: '56px 48px',
        boxShadow: 'var(--card-shadow)',
      }} className="reg-card">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '32px' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/></svg>
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>
            Red<span style={{ color: 'var(--crimson)' }}>Hope</span>
          </span>
        </Link>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Create account
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '36px' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: 'var(--crimson)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>FULL NAME</label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: { value: 6, message: "Min 6 characters" },
                pattern: { value: /^[A-Za-z\s]+$/, message: "Letters only" },
                validate: v => !AbandonWord.some(b => v.toLowerCase().includes(b)) || "Contains restricted words",
              })}
              onBlur={e => setValue("name", e.target.value.trim(), { shouldValidate: true })}
              type="text" placeholder="Full name"
              style={inputStyle(errors.name)}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.name ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.name && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>EMAIL</label>
            <input
              {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
              type="email" placeholder="you@example.com"
              style={inputStyle(errors.email)}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.email ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.email && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <input
                {...register("password", { required: "Required", minLength: { value: 8, message: "Min 8 characters" } })}
                type={show ? "text" : "password"} placeholder="Min 8 characters"
                style={{ ...inputStyle(errors.password), paddingRight: '48px' }}
                onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                onBlur={e => e.target.style.borderColor = errors.password ? 'var(--crimson)' : 'var(--border)'}
              />
              <button type="button" onClick={() => setShow(!show)} style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
              }}>{show ? '🙈' : '👁️'}</button>
            </div>
            {errors.password && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.password.message}</p>}
          </div>

          {/* Blood Group */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>BLOOD GROUP</label>
            <select
              {...register("bloodgroup", { required: "Select blood group", validate: v => v !== "default" || "Select a valid blood group" })}
              defaultValue="default"
              style={{ ...inputStyle(errors.bloodgroup), cursor: 'pointer' }}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.bloodgroup ? 'var(--crimson)' : 'var(--border)'}
            >
              <option value="default" disabled>Select your blood group</option>
              {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
            {errors.bloodgroup && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.bloodgroup.message}</p>}
          </div>

          <button type="submit" disabled={loading} style={{
            padding: '14px', borderRadius: '10px',
            background: loading ? 'var(--muted)' : 'var(--crimson)',
            color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
            marginTop: '8px', transition: 'all 0.2s',
          }}>
            {loading ? 'Creating account…' : 'Create account →'}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .reg-card { padding: 36px 24px !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;
