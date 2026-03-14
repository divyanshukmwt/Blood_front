import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ field, animateRef }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleNavigate = async (link) => {
    setMobileOpen(false);
    if (animateRef?.current?.reverseAnimation) {
      await animateRef.current.reverseAnimation();
    }
    navigate(link);
  };

  const handleLogOut = async (link) => {
    setMobileOpen(false);
    if (animateRef?.current?.reverseAnimation) {
      await animateRef.current.reverseAnimation();
    }
    if (link === "/adminLogout") {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  const isActive = (link) => location.pathname === link;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-h)",
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--ink-10)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          transition: "box-shadow 200ms ease",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            background: "var(--crimson)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z" fill="white"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "oswald, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            color: "var(--ink)",
            letterSpacing: "0.04em",
          }}>
            RED<span style={{ color: "var(--crimson)" }}>HOPE</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden-mobile">
          {field.map((item, index) =>
            item.name === "Logout" ? (
              <button
                key={index}
                onClick={() => handleLogOut(item.link)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--crimson)",
                  background: "var(--crimson-muted)",
                  border: "1px solid rgba(192,21,42,0.2)",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "Poppins, sans-serif",
                }}
                onMouseEnter={e => { e.target.style.background = "var(--crimson)"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = "var(--crimson-muted)"; e.target.style.color = "var(--crimson)"; }}
              >
                Logout
              </button>
            ) : (
              <button
                key={index}
                onClick={() => handleNavigate(item.link)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: isActive(item.link) ? 600 : 500,
                  color: isActive(item.link) ? "var(--crimson)" : "var(--ink-60)",
                  background: isActive(item.link) ? "var(--crimson-muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "Poppins, sans-serif",
                }}
                onMouseEnter={e => { if (!isActive(item.link)) { e.target.style.background = "var(--ink-5)"; e.target.style.color = "var(--ink)"; } }}
                onMouseLeave={e => { if (!isActive(item.link)) { e.target.style.background = "transparent"; e.target.style.color = "var(--ink-60)"; } }}
              >
                {item.name}
              </button>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            color: "var(--ink)",
          }}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13,13,13,0.4)",
            zIndex: 150,
            animation: "rh-fade-in 0.2s ease",
          }}
        />
      )}

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 85vw)",
          background: "#fff",
          zIndex: 200,
          boxShadow: "var(--shadow-xl)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 28, height: 28, background: "var(--crimson)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z" fill="white"/></svg>
            </div>
            <span style={{ fontFamily: "oswald,sans-serif", fontWeight: 700, fontSize: "18px", color: "var(--ink)" }}>RED<span style={{ color: "var(--crimson)" }}>HOPE</span></span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: "var(--ink-5)", border: "none", borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-60)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {field.map((item, index) =>
            item.name === "Logout" ? (
              <button
                key={index}
                onClick={() => handleLogOut(item.link)}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--crimson)",
                  background: "var(--crimson-muted)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "auto",
                }}
              >
                Logout
              </button>
            ) : (
              <button
                key={index}
                onClick={() => handleNavigate(item.link)}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: isActive(item.link) ? 600 : 400,
                  color: isActive(item.link) ? "var(--crimson)" : "var(--ink-60)",
                  background: isActive(item.link) ? "var(--crimson-muted)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {item.name}
              </button>
            )
          )}
        </div>
      </div>

      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
