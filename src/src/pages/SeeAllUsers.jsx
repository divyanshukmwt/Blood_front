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
    const fetchAllUsers = async () => {
      try {
        const res = await AdminAxios.post("/admin/seeAllUser");
        setAllUsers(res.data);
      } catch (err) { console.log(err); }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => { setUser(allUsers); }, [allUsers]);

  const filteredUsers = allUser.filter(
    user => user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = filteredUsers.filter(u => !u.block).length;
  const blockedCount = filteredUsers.filter(u => u.block).length;

  return (
    <div className="rh-page" style={{ background:"var(--ink-2)" }}>
      <Navbar field={[
        { link: "/admin", name: "Dashboard" },
        { link: "/ticket-raiser", name: "Tickets" },
        { link: "/", name: "Home" },
        { link: "/adminLogout", name: "Logout" },
      ]} />

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"32px 24px" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"30px", fontWeight:700, color:"var(--ink)", margin:0 }}>All Users</h1>
            <p style={{ color:"var(--ink-40)", fontSize:"14px", marginTop:"4px" }}>
              {filteredUsers.length} total · {activeCount} active · {blockedCount} blocked
            </p>
          </div>

          {/* Search */}
          <div style={{ position:"relative", width:"100%", maxWidth:"340px" }}>
            <svg style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:"var(--ink-20)", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              maxLength={40}
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              style={{ width:"100%", padding:"10px 16px 10px 38px", background:"#fff", border:"1.5px solid var(--ink-10)", borderRadius:"10px", fontSize:"14px", fontFamily:"Poppins,sans-serif", outline:"none", color:"var(--ink)", transition:"border-color 200ms ease" }}
              onFocus={e => { e.target.style.borderColor = "var(--crimson)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--ink-10)"; }}
            />
          </div>
        </div>

        {/* Users grid */}
        {filteredUsers.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:"16px" }}>
            {filteredUsers.map((item, index) => (
              <div key={index} style={{ background:"#fff", borderRadius:"16px", border:"1px solid var(--ink-10)", padding:"20px", boxShadow:"var(--shadow-sm)", transition:"all 200ms ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <UserCard data={item} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", padding:"80px 40px", textAlign:"center" }}>
            {allUser.length === 0 ? (
              <>
                <div className="rh-spinner" style={{ margin:"0 auto 16px" }}/>
                <p style={{ color:"var(--ink-40)", fontSize:"15px", fontWeight:500 }}>Loading users...</p>
              </>
            ) : (
              <>
                <div style={{ fontSize:"48px", marginBottom:"12px" }}>🔍</div>
                <p style={{ color:"var(--ink-40)", fontSize:"15px", fontWeight:500, margin:0 }}>No users match "{searchTerm}"</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeAllUsers;
