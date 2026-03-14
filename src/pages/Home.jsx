import React, { useState, useEffect } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader2 from "../components/Loader2";
import Testimonials from "./Testimonials";

const STATS = [
  { value: "10K+", label: "Lives Saved" },
  { value: "5K+", label: "Active Donors" },
  { value: "48hr", label: "Avg Response" },
  { value: "98%", label: "Success Rate" },
];

const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

const HOW_STEPS = [
  {
    num: "01",
    title: "Create your profile",
    desc: "Register with your blood group and location. Takes under 2 minutes.",
    icon: "👤",
  },
  {
    num: "02",
    title: "Post or Browse requests",
    desc: "Instantly post a blood request or browse donors near you in real time.",
    icon: "🔍",
  },
  {
    num: "03",
    title: "Connect & Donate",
    desc: "Get matched with a compatible donor and coordinate the donation.",
    icon: "🤝",
  },
];

const AWARENESS = [
  { title: "One donation saves 3 lives", icon: "🩸", color: "#C0152A" },
  { title: "You can donate every 56 days", icon: "📅", color: "#0D7A4E" },
  { title: "Only 7% of people have O−", icon: "⚡", color: "#B85C00" },
  { title: "Blood cannot be manufactured", icon: "🏥", color: "#4A3FD4" },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (loading) {
    return <Loader2 onComplete={() => setLoading(false)} />;
  }

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
        { link: "/users/contactUs", name: "Contact Us" },
      ]} />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: 'var(--ink)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        padding: '120px 0 80px',
      }}>
        {/* Background circles */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,21,42,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '40vw', height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,21,42,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="hero-grid">
            {/* Text */}
            <div style={{ animation: 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(192,21,42,0.15)', border: '1px solid rgba(192,21,42,0.3)',
                borderRadius: '100px', padding: '6px 14px',
                marginBottom: '28px',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--crimson)', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
                <span style={{ color: '#F08090', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  INDIA'S BLOOD DONATION PLATFORM
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                color: 'white', lineHeight: 1.0,
                letterSpacing: '-0.03em',
                marginBottom: '28px',
              }}>
                Give blood.<br />
                <span style={{ color: 'var(--crimson-light)' }}>Give life.</span>
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', lineHeight: 1.7,
                maxWidth: '460px', marginBottom: '40px',
              }}>
                Every 2 seconds someone needs blood. Be the reason a mother comes home, 
                a child laughs again, a stranger lives to see tomorrow.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/users/profile')} style={{
                  padding: '14px 28px', borderRadius: '10px',
                  background: 'var(--crimson)', color: 'white',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                  transition: 'all 0.25s',
                  boxShadow: '0 4px 24px rgba(192,21,42,0.4)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(192,21,42,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(192,21,42,0.4)'; }}
                >
                  Start Donating →
                </button>
                <button onClick={() => navigate('/donate/request-list')} style={{
                  padding: '14px 28px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.85)',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.95rem',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                >
                  Browse Requests
                </button>
              </div>
            </div>

            {/* Blood group grid visual */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', animation: 'fade-up 0.8s 0.2s cubic-bezier(0.22,1,0.36,1) both' }} className="hero-visual">
              {BLOOD_GROUPS.map((bg, i) => (
                <div key={i} style={{
                  background: i === 0 ? 'var(--crimson)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${i === 0 ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '16px', padding: '24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  aspectRatio: '1',
                  transition: 'all 0.3s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(192,21,42,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(192,21,42,0.5)';
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = i === 0 ? 'var(--crimson)' : 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = i === 0 ? 'transparent' : 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 800,
                    fontSize: '2rem', color: 'white', letterSpacing: '-0.02em',
                  }}>{bg}</span>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', letterSpacing: '0.08em' }}>BLOOD TYPE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{
        background: 'var(--crimson)',
        padding: '40px 0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center' }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: 'white', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 0', background: 'var(--white)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
              Three steps to save a life
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="steps-grid">
            {HOW_STEPS.map((s, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                background: 'var(--white)',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div style={{
                  position: 'absolute', top: '20px', right: '24px',
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: '4rem', color: 'var(--ash)', lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}>{s.num}</div>
                <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.25rem', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARENESS CARDS ── */}
      <section style={{ padding: '80px 0', background: 'var(--ash)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>
              DID YOU KNOW
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Facts that matter
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {AWARENESS.map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '16px',
                padding: '32px 24px',
                border: '1px solid var(--border)',
                textAlign: 'center',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.4 }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '100px 40px',
        background: 'var(--ink)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,21,42,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: 'white', letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}>
            Ready to be a hero?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Join thousands of donors across India who save lives every single day.
          </p>
          <button onClick={() => navigate('/register')} style={{
            padding: '16px 36px', borderRadius: '12px',
            background: 'var(--crimson)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1rem',
            transition: 'all 0.25s',
            boxShadow: '0 4px 24px rgba(192,21,42,0.5)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(192,21,42,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(192,21,42,0.5)'; }}
          >
            Join RedHope Today →
          </button>
        </div>
      </section>

      <Testimonials embedded />

      <Footer />

      <style>{`
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-visual { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
