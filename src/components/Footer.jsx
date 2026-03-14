import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = {
    service: [
      { name: "Receiver", href: "/reciver/blood" },
      { name: "Donation", href: "/donate/request-list" },
    ],
    helps: [
      { name: "Gmail", href: "mailto:codxdot@gmail.com" },
      { name: "Admin", href: "/admin" },
      { name: "Contact Us", href: "/users/contactUs" },
    ],
    legal: [
      { name: "Terms of Use", href: "src/assets/pdfs/Terms of Use.pdf", download: true },
      { name: "Cookie Policy", href: "src/assets/pdfs/Cookie Policy.pdf", download: true },
      { name: "Privacy Policy", href: "src/assets/pdfs/Privacy Policy.pdf", download: true },
    ],
  };

  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'var(--white)',
      padding: '64px 0 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {/* Top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--crimson)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem' }}>
                Red<span style={{ color: 'var(--crimson-light)' }}>Hope</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 240 }}>
              Every drop saves a life. Together we build a healthier India, one donation at a time.
            </p>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Services</p>
            {links.service.map((l, i) => (
              <a key={i} href={l.href} style={{
                display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                textDecoration: 'none', marginBottom: '12px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >{l.name}</a>
            ))}
          </div>

          {/* Help */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Help</p>
            {links.helps.map((l, i) => (
              <a key={i} href={l.href} style={{
                display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                textDecoration: 'none', marginBottom: '12px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >{l.name}</a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>Legal</p>
            {links.legal.map((l, i) => (
              <a key={i} href={l.href} download={l.download ? l.name : undefined} style={{
                display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                textDecoration: 'none', marginBottom: '12px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >{l.name}</a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            © 2024 RedHope. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
            Made with ❤️ for India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
