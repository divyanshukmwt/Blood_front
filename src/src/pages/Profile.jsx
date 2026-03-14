import { useContext, useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import AddRequest from '../components/AddRequest';
import Stricks from '../components/Stricks';
import { UserContext } from '../context/user.context';
import UploadForm from '../components/UploadForm';
import { receiveMessage } from '../config/Socket';
import BlockInterface from '../components/BlockInterface';
import { MdVerified } from "react-icons/md";
import DonarStricks from '../components/DonarStricks';
import Form from "../components/Form";

const StatCard = ({ icon, label, value, sub, accent }) => (
  <div style={{
    background: "#fff",
    border: "1px solid var(--ink-10)",
    borderRadius: "16px",
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: "1",
    minWidth: "140px",
  }}>
    <div style={{ width:36, height:36, background: accent ? "var(--crimson-muted)" : "var(--ink-5)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>{icon}</div>
    <div style={{ fontFamily:"oswald,sans-serif", fontSize:"28px", fontWeight:700, color: accent ? "var(--crimson)" : "var(--ink)", lineHeight:1 }}>{value}</div>
    <div style={{ fontSize:"13px", fontWeight:600, color:"var(--ink-60)" }}>{label}</div>
    {sub && <div style={{ fontSize:"11px", color:"var(--ink-20)" }}>{sub}</div>}
  </div>
);

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userDets, setUserDets] = useState(user);
  const [picModal, setPicModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [activeTab, setActiveTab] = useState("requests");

  useEffect(() => {
    receiveMessage("allPost", (data) => { setUser(data); setUserDets(data); });
    receiveMessage("reciver-update", (data) => { setUser(data); setUserDets(data); });
    receiveMessage("updateBlock-center", (data) => { setUser(data); setUserDets(data); });
  }, []);

  useEffect(() => { setUserDets(user); }, [user]);
  useEffect(() => { if (userDets?.number === null) setFormModal(true); }, [userDets?.number]);

  const sortedRequests = [...(userDets?.bloodRequest || [])]
    .filter(i => i?.date && i?.time)
    .sort((a, b) => {
      const dt = i => new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);
      return dt(b) - dt(a);
    });

  const sortedDonations = [...(userDets?.Donate || [])]
    .filter(i => i?.date && i?.time)
    .sort((a, b) => {
      const dt = i => new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);
      return dt(b) - dt(a);
    });

  return (
    <>
      {formModal && <Form fn={setFormModal} />}
      <div className="rh-page" style={{ background: "var(--ink-2)", minHeight: "100vh" }}>
        <Navbar field={[
          { link: "/", name: "Home" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
          { link: "/users/contactUs", name: "Contact" },
          { link: "/login", name: "Logout" },
        ]} />

        {picModal && <UploadForm fn={setPicModal} email={userDets.email} />}

        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 24px" }}>
          {/* Profile header card */}
          <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", marginBottom:"24px", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
            {/* Cover */}
            <div style={{ height:"120px", background:"linear-gradient(135deg, var(--crimson-dark) 0%, var(--crimson) 60%, #ff3d5a 100%)", position:"relative" }}>
              <div style={{ position:"absolute", inset:0, background:"url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"20\" fill=\"none\" stroke=\"rgba(255,255,255,0.06)\" stroke-width=\"1\"/%3E%3C/svg%3E') repeat" }}/>
            </div>

            <div style={{ padding:"0 32px 28px", position:"relative" }}>
              {/* Avatar */}
              <div style={{ position:"relative", width:"96px", marginTop:"-48px", marginBottom:"12px" }}>
                <div style={{ width:96, height:96, borderRadius:"50%", border:"4px solid #fff", background:"var(--ink-5)", overflow:"hidden", boxShadow:"var(--shadow-md)" }}>
                  {userDets?.profilepic && userDets?.pictype ? (
                    <img src={`data:${userDets.pictype};base64,${userDets.profilepic}`} alt="Profile" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  ) : (
                    <div style={{ width:"100%", height:"100%", background:"var(--crimson-muted)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"oswald,sans-serif", fontSize:"32px", color:"var(--crimson)" }}>
                      {(userDets?.name || "U")[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setPicModal(!picModal)}
                  style={{ position:"absolute", bottom:0, right:0, width:28, height:28, borderRadius:"50%", background:"var(--ink)", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff" }}
                >
                  <PiGooglePhotosLogoFill size={14}/>
                </button>
              </div>

              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <h2 style={{ fontFamily:"oswald,sans-serif", fontSize:"24px", fontWeight:700, color:"var(--ink)", margin:0 }}>
                      {userDets?.name || "Loading..."}
                    </h2>
                    {userDets?.verified && <MdVerified style={{ color:"var(--info)", fontSize:"20px" }}/>}
                  </div>
                  <p style={{ color:"var(--ink-40)", fontSize:"14px", margin:"4px 0 0" }}>{userDets?.email}</p>
                </div>

                <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                  {userDets?.bloodgroup && (
                    <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"var(--crimson-muted)", border:"1px solid rgba(192,21,42,0.2)", borderRadius:"99px", padding:"6px 14px", fontSize:"13px", fontWeight:700, color:"var(--crimson)", fontFamily:"oswald,sans-serif" }}>
                      🩸 {userDets.bloodgroup}
                    </span>
                  )}
                  {userDets?.verified && (
                    <span className="rh-badge rh-badge-info">Verified Member</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:"16px", marginBottom:"24px", flexWrap:"wrap" }}>
            <StatCard icon="🩸" label="Total Requests" value={userDets?.bloodRequest?.length || 0} sub="blood requests made" accent />
            <StatCard icon="💉" label="Donations" value={userDets?.Donate?.length || 0} sub="lives contributed to" />
            <StatCard icon="✓" label="Verified" value={userDets?.verified ? "Yes" : "No"} sub="account status" />
            <StatCard icon="📅" label="Delay Timer" value={userDets?.delayTime ? `${userDets.delayTime}s` : "—"} sub="between requests" />
          </div>

          {/* Add Request / Block */}
          <div style={{ marginBottom: "24px" }}>
            {userDets?.block === true ? <BlockInterface /> : <AddRequest time={userDets?.delayTime} />}
          </div>

          {/* Tabs */}
          <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", overflow:"hidden", boxShadow:"var(--shadow-sm)" }}>
            <div style={{ display:"flex", borderBottom:"1px solid var(--ink-10)", padding:"0 24px" }}>
              {[
                { id:"requests", label:"My Requests", count: sortedRequests.length },
                { id:"donations", label:"My Donations", count: sortedDonations.length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding:"16px 20px",
                    background:"none",
                    border:"none",
                    borderBottom: activeTab === tab.id ? "2px solid var(--crimson)" : "2px solid transparent",
                    cursor:"pointer",
                    fontFamily:"Poppins,sans-serif",
                    fontSize:"14px",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? "var(--crimson)" : "var(--ink-40)",
                    display:"flex",
                    alignItems:"center",
                    gap:"8px",
                    transition:"all 200ms ease",
                    marginBottom:"-1px",
                  }}
                >
                  {tab.label}
                  <span style={{ background: activeTab === tab.id ? "var(--crimson-muted)" : "var(--ink-5)", color: activeTab === tab.id ? "var(--crimson)" : "var(--ink-40)", borderRadius:"99px", padding:"2px 8px", fontSize:"11px", fontWeight:700 }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div
              id="scroller"
              style={{
                padding:"20px 24px",
                maxHeight:"500px",
                overflowY:"auto",
                opacity: userDets?.block ? 0.3 : 1,
                pointerEvents: userDets?.block ? "none" : "auto",
              }}
            >
              {activeTab === "requests" && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:"14px" }}>
                  {sortedRequests.length > 0 ? sortedRequests.map((item, i) => (
                    <Stricks key={i} bloodGroup={item.bloodType} date={item.date} time={item.time} status={item.status} id={item._id} />
                  )) : (
                    <div className="rh-empty" style={{ gridColumn:"1/-1" }}>
                      <div style={{ fontSize:"48px" }}>🩸</div>
                      <p style={{ color:"var(--ink-40)", fontSize:"15px", margin:0, fontWeight:500 }}>No blood requests yet</p>
                      <p style={{ color:"var(--ink-20)", fontSize:"13px", margin:0 }}>Your requests will appear here</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "donations" && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:"14px" }}>
                  {sortedDonations.length > 0 ? sortedDonations.map((item, i) => (
                    <DonarStricks key={i} bloodGroup={item.bloodType} date={item.date} time={item.time} id={item._id} />
                  )) : (
                    <div className="rh-empty" style={{ gridColumn:"1/-1" }}>
                      <div style={{ fontSize:"48px" }}>💉</div>
                      <p style={{ color:"var(--ink-40)", fontSize:"15px", margin:0, fontWeight:500 }}>No donations yet</p>
                      <p style={{ color:"var(--ink-20)", fontSize:"13px", margin:0 }}>Start donating to help those in need</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
