import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ field, animateRef }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const handleNavigate = async (link) => {
    setOpen(false);
    if (animateRef?.current?.reverseAnimation) {
      await animateRef.current.reverseAnimation();
    }
    navigate(link);
  };

  const handleLogOut = async (link) => {
    setOpen(false);
    if (animateRef?.current?.reverseAnimation) await animateRef.current.reverseAnimation();
    if (link === "/adminLogout") {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  const isLogout = (name) => name === "Logout";

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(253,252,251,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button onClick={() => handleNavigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--crimson)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse-ring 2.5s ease infinite',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-13z"/>
              </svg>
            </div>
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800, fontSize: '1.2rem',
              color: 'var(--ink)', letterSpacing: '-0.02em',
            }}>
              Red<span style={{ color: 'var(--crimson)' }}>Hope</span>
            </span>
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            {field.map((item, i) =>
              isLogout(item.name) ? (
                <button key={i} onClick={() => handleLogOut(item.link)} style={{
                  padding: '8px 18px', borderRadius: '8px',
                  background: 'var(--crimson)', color: 'white',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.target.style.background = 'var(--crimson-dark)'}
                  onMouseLeave={e => e.target.style.background = 'var(--crimson)'}
                >
                  Sign out
                </button>
              ) : (
                <button key={i} onClick={() => handleNavigate(item.link)} style={{
                  padding: '8px 14px', borderRadius: '8px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.875rem',
                  color: location.pathname === item.link ? 'var(--crimson)' : 'var(--ink-light)',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--crimson)'}
                  onMouseLeave={e => e.target.style.color = location.pathname === item.link ? 'var(--crimson)' : 'var(--ink-light)'}
                >
                  {item.name}
                </button>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(true)} style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', borderRadius: '8px',
          }} className="mobile-menu-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(15,13,12,0.5)', backdropFilter: 'blur(4px)',
          animation: 'fade-in 0.2s ease',
        }} onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 101,
        width: '280px', background: 'var(--white)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        boxShadow: '-16px 0 40px rgba(15,13,12,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>
            Red<span style={{ color: 'var(--crimson)' }}>Hope</span>
          </span>
          <button onClick={() => setOpen(false)} style={{
            background: 'var(--ash)', border: 'none', cursor: 'pointer',
            width: 36, height: 36, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {field.map((item, i) =>
          isLogout(item.name) ? (
            <button key={i} onClick={() => handleLogOut(item.link)} style={{
              width: '100%', padding: '14px 16px', borderRadius: '10px',
              background: 'var(--crimson)', color: 'white',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '1rem',
              marginTop: '8px',
            }}>Sign out</button>
          ) : (
            <button key={i} onClick={() => handleNavigate(item.link)} style={{
              width: '100%', padding: '14px 16px', borderRadius: '10px',
              background: location.pathname === item.link ? 'var(--crimson-pale)' : 'transparent',
              color: location.pathname === item.link ? 'var(--crimson)' : 'var(--ink)',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '1rem',
            }}>{item.name}</button>
          )
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
