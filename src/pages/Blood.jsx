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
      const sorted = filtered.sort((a, b) => {
        const dt = (item) => new Date(`${item.date.split("/").reverse().join("-")} ${item.time}`);
        return dt(b) - dt(a);
      });
      setFilteredPosts(sorted);
    } else {
      setFilteredPosts([]);
    }
  }, [filterData, user?.bloodRequest]);

  const counts = {
    all: user?.bloodRequest?.length || 0,
    pending: user?.bloodRequest?.filter(r => r.status === 'pending').length || 0,
    Accepted: user?.bloodRequest?.filter(r => r.status === 'Accepted').length || 0,
  };

  return (
    <div style={{ background: 'var(--ash)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/about", name: "About" },
        { link: "/users/contactUs", name: "Contact Us" },
      ]} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 48px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '8px' }}>MY BLOOD REQUESTS</p>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
            Track your requests
          </h1>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { v: 'allRequest', l: 'All', count: counts.all },
            { v: 'pending', l: 'Pending', count: counts.pending },
            { v: 'Accepted', l: 'Accepted', count: counts.Accepted },
          ].map(({ v, l, count }) => (
            <button key={v} onClick={() => setFilterData(v)} style={{
              padding: '10px 18px', borderRadius: '100px',
              border: '1.5px solid',
              borderColor: filterData === v ? 'var(--crimson)' : 'var(--border)',
              background: filterData === v ? 'var(--crimson)' : 'white',
              color: filterData === v ? 'white' : 'var(--ink)',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}>
              {l}
              <span style={{
                background: filterData === v ? 'rgba(255,255,255,0.25)' : 'var(--ash)',
                color: filterData === v ? 'white' : 'var(--muted)',
                borderRadius: '100px', padding: '1px 7px', fontSize: '0.75rem', fontWeight: 700,
              }}>{count}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        {filteredPosts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredPosts.map((item, i) => (
              <RequestCard key={i} user={user} data={item} lightTheme />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.25rem', marginBottom: '8px' }}>No requests found</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Your blood requests will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blood;
