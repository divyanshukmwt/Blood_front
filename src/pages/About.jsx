import React, { useState } from 'react';
import Navbar from "../utils/Navbar";
import Footer from "../components/Footer";
import AboutDets from '../utils/About';

const About = () => {
  const [eachCard] = useState(AboutDets);

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/", name: "Home" },
        { link: "/users/contactUs", name: "Contact Us" },
      ]} />

      {/* Hero */}
      <section style={{
        background: 'var(--ink)', padding: '140px 24px 80px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,21,42,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F08090', marginBottom: '16px' }}>ABOUT REDHOPE</p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'white', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '20px',
          }}>
            The people behind<br/>
            <span style={{ color: 'var(--crimson-light)' }}>every saved life</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.7 }}>
            RedHope was built by a team that believes technology can bridge the gap between those who need blood and those willing to give it.
          </p>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 0', maxWidth: '1100px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>OUR TEAM</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em' }}>
            Meet the team
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {eachCard.map((item, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '20px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; e.currentTarget.style.borderColor = 'transparent'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {/* Image */}
              <div style={{ height: '200px', overflow: 'hidden', background: 'var(--ash)' }}>
                {item.img ? (
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--crimson)' }}>
                    <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '4rem', color: 'white' }}>
                      {item.name?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</h3>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--crimson)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>{item.role}</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.para}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: 'var(--ash)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>OUR MISSION</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Zero preventable deaths due to blood shortage
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Every drop of blood is more than a donation — it's a promise of hope, a gift of love, and a chance to save a life. Together, we can save lives and build a healthier India.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
