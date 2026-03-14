import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import AdminProfilePic from "../components/AdminProfilePic";
import { AdminContext } from '../context/admin.context';
import AdminAxios from "../config/AdminAxios";
import { receiveMessage, sendMessage } from '../config/Socket';
import SelectBox from '../components/SelectBox';
import { Link } from "react-router-dom";

const timecalculator = (time) => {
  if (time == 60) return "60s"; if (time == 120) return "2 min";
  if (time == 300) return "5 min"; if (time == 600) return "10 min";
  if (time == 1800) return "30 min"; if (time == 3600) return "1 hour";
  return "—";
};

const MetricCard = ({ icon, label, value, sub, accent }) => (
  <div style={{
    background: accent ? "var(--crimson)" : "#fff",
    border: accent ? "none" : "1px solid var(--ink-10)",
    borderRadius:"14px", padding:"20px 22px",
    display:"flex", alignItems:"center", gap:"14px",
    boxShadow: accent ? "var(--shadow-crimson)" : "var(--shadow-sm)",
  }}>
    <div style={{ width:44, height:44, borderRadius:"12px", background: accent ? "rgba(255,255,255,0.2)" : "var(--crimson-muted)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>
      {icon}
    </div>
    <div>
      <p style={{ fontFamily:"oswald,sans-serif", fontSize:"26px", fontWeight:700, color: accent ? "#fff" : "var(--ink)", margin:0, lineHeight:1 }}>{value}</p>
      <p style={{ fontSize:"13px", fontWeight:600, color: accent ? "rgba(255,255,255,0.8)" : "var(--ink-60)", margin:"4px 0 0" }}>{label}</p>
      {sub && <p style={{ fontSize:"11px", color: accent ? "rgba(255,255,255,0.5)" : "var(--ink-20)", margin:"2px 0 0" }}>{sub}</p>}
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
    const fetchCounts = async () => {
      try {
        const res = await AdminAxios.post("/admin/allcounts");
        setCounts(res.data);
      } catch (err) { console.log(err); }
    };
    fetchCounts();
  }, []);

  const serverHandel = () => sendMessage("server-req", adminDets.email);

  useEffect(() => {
    receiveMessage("server-res", (data) => { setAdmin(data); setAdminDets(data); });
  }, []);

  useEffect(() => {
    setTime(timecalculator(admin.delayTimer));
  }, [admin.delayTimer]);

  const isServerOn = adminDets.serverOnOff === true;

  return (
    <div className="rh-page" style={{ background:"var(--ink-2)" }}>
      <Navbar field={[
        { link: "/", name: "Home" },
        { link: "/allUsers", name: "Users" },
        { link: "/ticket-raiser", name: "Tickets" },
        { link: "/adminLogout", name: "Logout" },
      ]} />

      {picModal && <AdminProfilePic fn={setPicModal} email={adminDets.email} />}

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 24px" }}>
        {/* Admin profile header */}
        <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", padding:"28px 32px", marginBottom:"24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"20px", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ position:"relative" }}>
              <div style={{ width:72, height:72, borderRadius:"16px", overflow:"hidden", border:"2px solid var(--ink-10)", background:"var(--ink-5)" }}>
                <img
                  style={{ width:"100%", height:"100%", objectFit:"cover" }}
                  src={`data:${adminDets.pictype};base64,${adminDets.profilepic}`}
                  alt="Admin"
                />
              </div>
              <button
                onClick={() => setPicModal(!picModal)}
                style={{ position:"absolute", bottom:"-6px", right:"-6px", width:24, height:24, borderRadius:"50%", background:"var(--ink)", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff" }}
              >
                <PiGooglePhotosLogoFill size={12}/>
              </button>
            </div>
            <div>
              <h2 style={{ fontFamily:"oswald,sans-serif", fontSize:"22px", fontWeight:700, color:"var(--ink)", margin:0 }}>{admin.name}</h2>
              <p style={{ fontSize:"13px", color:"var(--ink-40)", margin:"4px 0 0" }}>{admin.email}</p>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", marginTop:"6px", background:"var(--crimson-muted)", border:"1px solid rgba(192,21,42,0.15)", borderRadius:"99px", padding:"3px 10px", fontSize:"11px", fontWeight:700, color:"var(--crimson)", textTransform:"uppercase", letterSpacing:"0.05em" }}>
                ⚡ Admin
              </span>
            </div>
          </div>

          {/* Server toggle */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"8px" }}>
            <p style={{ fontSize:"12px", fontWeight:600, color:"var(--ink-40)", textTransform:"uppercase", letterSpacing:"0.06em", margin:0 }}>Server Status</p>
            <button
              onClick={serverHandel}
              style={{
                display:"flex", alignItems:"center", gap:"10px",
                padding:"10px 20px", borderRadius:"10px", cursor:"pointer",
                background: isServerOn ? "var(--success-bg)" : "var(--crimson-muted)",
                border: isServerOn ? "1.5px solid rgba(10,143,92,0.3)" : "1.5px solid rgba(192,21,42,0.3)",
                color: isServerOn ? "var(--success)" : "var(--crimson)",
                fontFamily:"Poppins,sans-serif", fontSize:"14px", fontWeight:700,
                transition:"all 200ms ease",
              }}
            >
              <span style={{ width:8, height:8, borderRadius:"50%", background: isServerOn ? "var(--success)" : "var(--crimson)", animation: isServerOn ? "rh-heartbeat 2s infinite" : "none" }}/>
              {isServerOn ? "Server ON" : "Server OFF"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:"16px", marginBottom:"24px" }}>
          <MetricCard icon="👥" label="Total Users" value={counts.UserCount || 0} sub="registered accounts" accent />
          <MetricCard icon="🩸" label="Blood Requests" value={counts.requestCount || 0} sub="total requests made" />
          <MetricCard icon="🎫" label="Support Tickets" value={counts.ticketCounst || 0} sub="support cases" />
          <MetricCard icon="⏱️" label="Delay Timer" value={time} sub="current request delay" />
        </div>

        {/* Main grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
          {/* Quick actions */}
          <div style={{ background:"#fff", border:"1px solid var(--ink-10)", borderRadius:"18px", padding:"24px", boxShadow:"var(--shadow-sm)" }}>
            <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"18px", fontWeight:700, color:"var(--ink)", margin:"0 0 16px" }}>Quick Actions</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <Link to="/allUsers" style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", background:"var(--ink-2)", borderRadius:"12px", textDecoration:"none", border:"1px solid var(--ink-10)", transition:"all 150ms ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--crimson-muted)"; e.currentTarget.style.borderColor = "rgba(192,21,42,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--ink-2)"; e.currentTarget.style.borderColor = "var(--ink-10)"; }}
              >
                <div style={{ width:36, height:36, background:"var(--crimson-muted)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <p style={{ fontSize:"14px", fontWeight:600, color:"var(--ink)", margin:0 }}>Manage Users</p>
                  <p style={{ fontSize:"12px", color:"var(--ink-40)", margin:0 }}>View, block or unblock users</p>
                </div>
                <svg style={{ marginLeft:"auto", color:"var(--ink-20)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>

              <Link to="/ticket-raiser" style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 16px", background:"var(--ink-2)", borderRadius:"12px", textDecoration:"none", border:"1px solid var(--ink-10)", transition:"all 150ms ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--info-bg)"; e.currentTarget.style.borderColor = "rgba(21,101,192,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--ink-2)"; e.currentTarget.style.borderColor = "var(--ink-10)"; }}
              >
                <div style={{ width:36, height:36, background:"var(--info-bg)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
                </div>
                <div>
                  <p style={{ fontSize:"14px", fontWeight:600, color:"var(--ink)", margin:0 }}>Support Tickets</p>
                  <p style={{ fontSize:"12px", color:"var(--ink-40)", margin:0 }}>View and respond to tickets</p>
                </div>
                <svg style={{ marginLeft:"auto", color:"var(--ink-20)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            </div>
          </div>

          {/* Delay timer control */}
          <div style={{ background:"#fff", border:"1px solid var(--ink-10)", borderRadius:"18px", padding:"24px", boxShadow:"var(--shadow-sm)", position:"relative" }}>
            <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"18px", fontWeight:700, color:"var(--ink)", margin:"0 0 8px" }}>Request Delay Timer</h3>
            <p style={{ fontSize:"13px", color:"var(--ink-40)", margin:"0 0 20px" }}>
              Controls the minimum time between user blood requests. Currently: <strong style={{ color:"var(--ink)" }}>{time}</strong>
            </p>
            <SelectBox option={["60s", "2min", "5min", "10min", "30min", "1hr"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
