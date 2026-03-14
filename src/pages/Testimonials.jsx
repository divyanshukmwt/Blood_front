import React from 'react';

const TESTIMONIALS = [
  {
    quote: "RedHope connected me with a donor in 3 hours. My daughter is alive because of this platform.",
    name: "Priya Sharma",
    location: "Mumbai",
    blood: "O−",
  },
  {
    quote: "I've donated 4 times through RedHope. The process is seamless and the impact is real.",
    name: "Rahul Verma",
    location: "Delhi",
    blood: "A+",
  },
  {
    quote: "As a doctor, I recommend RedHope to all my patients in need. It works when time matters most.",
    name: "Dr. Anjali Mehta",
    location: "Bangalore",
    blood: "B+",
  },
];

const Testimonials = ({ embedded }) => (
  <section style={{ padding: embedded ? '80px 0' : '100px 0', background: embedded ? 'var(--white)' : 'var(--white)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>TESTIMONIALS</p>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em' }}>
          Stories of hope
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{
            background: i === 1 ? 'var(--ink)' : 'var(--ash)',
            borderRadius: '20px', padding: '32px',
            border: '1px solid',
            borderColor: i === 1 ? 'transparent' : 'var(--border)',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--crimson)' }}>"</div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: i === 1 ? 'rgba(255,255,255,0.75)' : 'var(--ink-light)', marginBottom: '24px' }}>
              {t.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.95rem', color: i === 1 ? 'white' : 'var(--ink)' }}>{t.name}</div>
                <div style={{ fontSize: '0.78rem', color: i === 1 ? 'rgba(255,255,255,0.4)' : 'var(--muted)' }}>{t.location}</div>
              </div>
              <span style={{
                padding: '5px 10px', borderRadius: '100px',
                background: i === 1 ? 'rgba(192,21,42,0.2)' : 'var(--crimson-pale)',
                color: i === 1 ? '#F08090' : 'var(--crimson)',
                fontFamily: 'Syne', fontWeight: 800, fontSize: '0.9rem',
              }}>{t.blood}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 767px) {
        .testimonials-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

export default Testimonials;
