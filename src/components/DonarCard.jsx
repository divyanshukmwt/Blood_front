import DonateForm from './DonateForm';

const URGENCY = {
  high:   { bg: '#FFF0F0', color: '#C0152A', border: '#FFCDD2', label: '🔴 Critical' },
  Medium: { bg: '#FFF8E6', color: '#B85C00', border: '#FFE0A0', label: '🟡 Moderate' },
  Low:    { bg: '#F0FFF4', color: '#0D7A4E', border: '#B2F5C8', label: '🟢 Non-urgent' },
};

const DonarCard = ({ data, btn, fn }) => {
  const urgency = URGENCY[data.urgency] || { bg: 'var(--ash)', color: 'var(--muted)', border: 'var(--border)', label: 'Unknown' };

  return (
    <>
      <DonateForm modal={btn} dataId={data._id} modalfn={fn} name={data.reciventId.name} />
      <div style={{
        background: 'white', borderRadius: '20px',
        border: '1px solid var(--border)',
        padding: '24px',
        transition: 'all 0.3s',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'transparent'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border)', background: 'var(--ash)', flexShrink: 0 }}>
            {data.reciventId.profilepic && data.reciventId.pictype ? (
              <img src={`data:${data.reciventId.pictype};base64,${data.reciventId.profilepic}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontFamily: 'Syne', fontWeight: 800, fontSize: '1.25rem' }}>{data.reciventId.name?.[0]?.toUpperCase()}</span>
              </div>
            )}
          </div>
          <span style={{
            padding: '5px 10px', borderRadius: '100px',
            background: urgency.bg, color: urgency.color,
            border: `1px solid ${urgency.border}`,
            fontSize: '0.75rem', fontWeight: 700,
          }}>{urgency.label}</span>
        </div>

        {/* Name & blood */}
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>{data.reciventId.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.5rem', color: 'var(--crimson)' }}>{data.bloodType}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>blood required</span>
          </div>
        </div>

        {/* Date/time */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--muted)' }}>
            <span>📅</span>{data.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--muted)' }}>
            <span>⏰</span>{data.time}
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => fn(true)} style={{
          width: '100%', padding: '12px',
          borderRadius: '10px', border: 'none',
          background: 'var(--crimson)', color: 'white',
          cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.9rem',
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
        >
          🩸 Donate Now
        </button>
      </div>
    </>
  );
};

export default DonarCard;
