import React, { useState, useEffect } from 'react';
import Navbar from '../utils/Navbar';
import Ticket from '../components/Ticket';
import TicketForm from '../components/TicketForm';
import AdminAxios from "../config/AdminAxios";

const TicketRaiser = () => {
  const [modal, setModal] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    const ticketFetch = async () => {
      try {
        const res = await AdminAxios.post("/admin/ticket");
        setCard(res.data);
      } catch (err) { console.error(err); }
    };
    ticketFetch();
  }, []);

  return (
    <div style={{ background: 'var(--ash)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/admin", name: "Dashboard" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
        { link: "/adminLogout", name: "Logout" },
      ]} />

      <TicketForm vari={modal} fn={setModal} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '96px 24px 48px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '8px' }}>ADMIN</p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Support Tickets
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              {card.length} ticket{card.length !== 1 ? 's' : ''} raised
            </p>
          </div>

          <button onClick={() => setModal(true)} style={{
            padding: '12px 24px', borderRadius: '10px',
            background: 'var(--crimson)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 2px 12px rgba(192,21,42,0.3)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.transform = 'none'; }}
          >
            🎫 Raise New Ticket
          </button>
        </div>

        {/* Ticket Cards */}
        {card.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {card.map((item, i) => (
              <Ticket key={i} data={item} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '80px',
            background: 'white', borderRadius: '20px', border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎫</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem', marginBottom: '8px' }}>No tickets yet</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Raise a ticket to communicate system issues or updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketRaiser;
