import React, { useState, useEffect } from 'react';
import Navbar from '../utils/Navbar';
import Ticket from '../components/Ticket';
import TicketForm from '../components/TicketForm';
import AdminAxios from "../config/AdminAxios";

const TicketRaiser = () => {
  const [modal, setModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ticketFetch = async () => {
      try {
        const res = await AdminAxios.post("/admin/ticket");
        setCards(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    ticketFetch();
  }, []);

  return (
    <div className="rh-page" style={{ background:"var(--ink-2)" }}>
      <Navbar field={[
        { link: "/admin", name: "Dashboard" },
        { link: "/allUsers", name: "Users" },
        { link: "/", name: "Home" },
        { link: "/adminLogout", name: "Logout" },
      ]} />

      <TicketForm vari={modal} fn={setModal} />

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"32px 24px" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"30px", fontWeight:700, color:"var(--ink)", margin:0 }}>Support Tickets</h1>
            <p style={{ color:"var(--ink-40)", fontSize:"14px", marginTop:"4px" }}>
              {cards.length} total ticket{cards.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="rh-btn rh-btn-primary rh-btn-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Raise Ticket
          </button>
        </div>

        {/* Tickets */}
        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", padding:"80px 0" }}>
            <div className="rh-spinner"/>
          </div>
        ) : cards && cards.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:"16px" }}>
            {cards.map((item, index) => <Ticket key={index} data={item} />)}
          </div>
        ) : (
          <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", padding:"80px 40px", textAlign:"center" }}>
            <div style={{ fontSize:"48px", marginBottom:"12px" }}>🎫</div>
            <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"22px", color:"var(--ink-40)", margin:"0 0 8px" }}>No Tickets Yet</h3>
            <p style={{ color:"var(--ink-20)", fontSize:"14px", margin:"0 0 20px" }}>Raise your first support ticket using the button above.</p>
            <button onClick={() => setModal(true)} className="rh-btn rh-btn-primary rh-btn-md">Raise First Ticket</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketRaiser;
