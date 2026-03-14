import React, { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import UserCard from "../components/UserCard";
import AdminAxios from "../config/AdminAxios";
import { AllUsersContext } from "../context/AllUsers.context";

const SeeAllUsers = () => {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const [allUser, setUser] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AdminAxios.post("/admin/seeAllUser").then(res => setAllUsers(res.data)).catch(console.log);
  }, []);

  useEffect(() => { setUser(allUsers); }, [allUsers]);

  const filteredUsers = allUser.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--ash)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/admin", name: "Dashboard" },
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
      ]} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 48px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '8px' }}>USER MANAGEMENT</p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              All Users
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4px' }}>{filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found</p>
          </div>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <input
              maxLength={40}
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or email…"
              style={{
                width: '100%', padding: '11px 16px 11px 40px', borderRadius: '10px',
                border: '1.5px solid var(--border)',
                background: 'white', fontSize: '0.875rem', outline: 'none',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '1rem' }}>🔍</span>
          </div>
        </div>

        {/* Grid */}
        {filteredUsers.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredUsers.map((user, i) => <UserCard key={i} user={user} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.25rem', marginBottom: '8px' }}>No users found</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllUsers;
