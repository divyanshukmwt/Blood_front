import React, { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import RequestCard from "../components/RequestCard";
import { UserContext } from "../context/user.context";

const Blood = () => {
  const { user } = useContext(UserContext);
  const [filterData, setFilterData] = useState("allRequest");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (user?.bloodRequest?.length) {
      const filtered = user.bloodRequest.filter(item => {
        if (filterData === "allRequest") return true;
        return item.status === filterData;
      });
      const sorted = [...filtered].sort((a, b) => {
        const dt = i => new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);
        return dt(b) - dt(a);
      });
      setFilteredPosts(sorted);
    } else {
      setFilteredPosts([]);
    }
  }, [filterData, user?.bloodRequest]);

  const tabs = [
    { value: "allRequest", label: "All", count: user?.bloodRequest?.length || 0 },
    { value: "pending", label: "Pending", count: (user?.bloodRequest || []).filter(r => r.status === "pending").length },
    { value: "Accepted", label: "Accepted", count: (user?.bloodRequest || []).filter(r => r.status === "Accepted").length },
  ];

  return (
    <div className="rh-page" style={{ background: "var(--ink-2)" }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/about", name: "About" },
        { link: "/users/contactUs", name: "Contact" },
      ]} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Page header */}
        <div style={{ marginBottom:"28px" }}>
          <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"32px", fontWeight:700, color:"var(--ink)", margin:0 }}>My Blood Requests</h1>
          <p style={{ color:"var(--ink-40)", fontSize:"15px", marginTop:"6px" }}>Track and manage all your blood requests</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"24px", flexWrap:"wrap" }}>
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilterData(tab.value)}
              style={{
                display:"inline-flex", alignItems:"center", gap:"8px",
                padding:"9px 18px", borderRadius:"99px",
                background: filterData === tab.value ? "var(--crimson)" : "#fff",
                color: filterData === tab.value ? "#fff" : "var(--ink-60)",
                border: filterData === tab.value ? "1.5px solid var(--crimson)" : "1.5px solid var(--ink-10)",
                cursor:"pointer", fontSize:"14px", fontWeight:600,
                fontFamily:"Poppins,sans-serif", transition:"all 200ms ease",
                boxShadow: filterData === tab.value ? "var(--shadow-crimson)" : "none",
              }}
            >
              {tab.label}
              <span style={{
                background: filterData === tab.value ? "rgba(255,255,255,0.25)" : "var(--ink-5)",
                color: filterData === tab.value ? "#fff" : "var(--ink-40)",
                borderRadius:"99px", padding:"2px 7px", fontSize:"12px", fontWeight:700,
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {filteredPosts.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:"16px" }}>
            {filteredPosts.map((item, index) => (
              <RequestCard key={index} user={user} data={item} lightTheme />
            ))}
          </div>
        ) : (
          <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", padding:"80px 40px", textAlign:"center" }}>
            <div style={{ fontSize:"56px", marginBottom:"16px" }}>🔍</div>
            <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"22px", color:"var(--ink-40)", margin:"0 0 8px" }}>No Requests Found</h3>
            <p style={{ color:"var(--ink-20)", fontSize:"14px", margin:0 }}>
              {filterData === "allRequest" ? "You haven't made any blood requests yet." : `No ${filterData} requests found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blood;
