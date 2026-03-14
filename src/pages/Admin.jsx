import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import AdminProfilePic from "../components/AdminProfilePic";
import Scales from '../components/Scales';
import { AdminContext } from '../context/admin.context';
import AdminAxios from "../config/AdminAxios";
import { receiveMessage, sendMessage } from '../config/Socket';
import SelectBox from '../components/SelectBox';
import { Link } from "react-router-dom";

const timecalculator = (t) => {
  if (t == 60) return "60s";
  if (t == 120) return "2 min";
  if (t == 300) return "5 min";
  if (t == 600) return "10 min";
  if (t == 1800) return "30 min";
  if (t == 3600) return "1 hr";
  return "—";
};

const MetricCard = ({ label, value, sub, icon, accent }) => (
  <div style={{
    background: 'white', borderRadius: '16px', padding: '24px',
    border: '1px solid var(--border)', display: 'flex', gap: '16px', alignItems: 'flex-start',
  }}>
    <div style={{ width: 44, height: 44, borderRadius: '12px', background: accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{icon}</div>
    <div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'var(--ink)', lineHeight: 1 }}>{value ?? '—'}</div>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginTop: '4px' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: accent, marginTop: '2px' }}>{sub}</div>}
    </div>
  </div>
);

const Admin = () => {
  const [picModal, setPicModal] = useState(false);
  const { admin, setAdmin } = useContext(AdminContext);
  const [adminDets, setAdminDets] = useState(admin);
  const [counts, setCounts] = useState({});
  const [time, setTime] = useState("");

  useEffect(() => { setAdminDets(admin); }, [admin]);

  useEffect(() => {
    AdminAxios.post("/admin/allcounts").then(res => setCounts(res.data)).catch(console.log);
  }, []);

  useEffect(() => {
    receiveMessage("server-res", (data) => { setAdmin(data); setAdminDets(data); });
  }, []);

  useEffect(() => { setTime(timecalculator(admin.delayTimer)); }, [admin.delayTimer]);

  return (
    <div style={{ background: 'var(--ash)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
        { link: "/adminLogout", name: "Logout" },
      ]} />

      {picModal && <AdminProfilePic fn={setPicModal} email={adminDets.email} />}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '96px 24px 48px' }}>
        {/* Header card */}
        <div style={{
          background: 'var(--ink)', borderRadius: '24px', padding: '40px',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px',
          flexWrap: 'wrap', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,21,42,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)' }}>
              <img src={`data:${adminDets.pictype};base64,${adminDets.profilepic}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <button onClick={() => setPicModal(true)} style={{
              position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%',
              background: 'var(--crimson)', border: '2px solid var(--ink)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>ADMIN DASHBOARD</div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'white', letterSpacing: '-0.02em' }}>{admin.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{admin.email}</p>
          </div>
          <button
            onClick={() => sendMessage("server-req", adminDets.email)}
            style={{
              padding: '12px 20px', borderRadius: '10px',
              background: adminDets.serverOnOff ? 'rgba(13,122,78,0.2)' : 'rgba(192,21,42,0.2)',
              border: `1px solid ${adminDets.serverOnOff ? 'rgba(13,122,78,0.4)' : 'rgba(192,21,42,0.4)'}`,
              color: adminDets.serverOnOff ? '#4adeab' : '#f87171',
              cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.875rem',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: adminDets.serverOnOff ? '#4adeab' : '#f87171', display: 'inline-block' }} />
            Server: {adminDets.serverOnOff ? 'ONLINE' : 'OFFLINE'}
          </button>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <MetricCard label="Total Users" value={counts.UserCount} icon="👥" accent="#4A3FD4" />
          <MetricCard label="Blood Requests" value={counts.requestCount} icon="🩸" accent="var(--crimson)" />
          <MetricCard label="Support Tickets" value={counts.ticketCounst} icon="🎫" accent="#B85C00" />
          <MetricCard label="Delay Timer" value={time} icon="⏱️" accent="#0D7A4E" sub="Active cooldown" />
        </div>

        {/* Action row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '16px' }} className="admin-bottom-grid">
          {/* Quick actions */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/allUsers" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', borderRadius: '12px',
                background: 'var(--ash)', textDecoration: 'none',
                color: 'var(--ink)', fontWeight: 600, fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-pale)'; e.currentTarget.style.color = 'var(--crimson)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--ash)'; e.currentTarget.style.color = 'var(--ink)'; }}
              >
                <span>👥</span> See All Users
                <span style={{ marginLeft: 'auto', fontSize: '1rem' }}>→</span>
              </Link>
              <Link to="/ticket-raiser" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', borderRadius: '12px',
                background: 'var(--ash)', textDecoration: 'none',
                color: 'var(--ink)', fontWeight: 600, fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-pale)'; e.currentTarget.style.color = 'var(--crimson)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--ash)'; e.currentTarget.style.color = 'var(--ink)'; }}
              >
                <span>🎫</span> Ticket Raiser
                <span style={{ marginLeft: 'auto', fontSize: '1rem' }}>→</span>
              </Link>
            </div>
          </div>

          {/* Delay Timer */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Request Delay Timer</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Currently set to <span style={{ color: 'var(--crimson)', fontWeight: 700 }}>{time}</span>
            </p>
            <SelectBox option={["60s", "2min", "5min", "10min", "30min", "1hr"]} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .admin-bottom-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default Admin;
