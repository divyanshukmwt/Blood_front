import DonateForm from './DonateForm';

const DonarCard = ({ data, btn, fn }) => {
  const urgencyConfig = {
    high: { label: "High", bg: "var(--crimson-muted)", color: "var(--crimson)", dot: "#C0152A" },
    Medium: { label: "Medium", bg: "var(--warning-bg)", color: "var(--warning)", dot: "#C47A00" },
    Low: { label: "Low", bg: "var(--success-bg)", color: "var(--success)", dot: "#0A8F5C" },
  };
  const urgency = urgencyConfig[data.urgency] || { label: data.urgency, bg: "var(--ink-5)", color: "var(--ink-40)", dot: "#A8A8A8" };

  return (
    <>
      <DonateForm modal={btn} dataId={data._id} modalfn={fn} name={data.reciventId.name} />
      <div
        className="rh-card"
        style={{ padding:"20px", display:"flex", flexDirection:"column", gap:"16px", transition:"all 250ms ease", cursor:"default" }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
      >
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:44, height:44, borderRadius:"12px", overflow:"hidden", border:"1px solid var(--ink-10)", background:"var(--ink-5)", flexShrink:0 }}>
              <img
                src={`data:${data.reciventId.pictype};base64,${data.reciventId.profilepic}`}
                alt={data.reciventId.name}
                style={{ width:"100%", height:"100%", objectFit:"cover" }}
              />
            </div>
            <div>
              <p style={{ fontFamily:"Poppins,sans-serif", fontSize:"14px", fontWeight:600, color:"var(--ink)", margin:0 }}>{data.reciventId.name}</p>
              <p style={{ fontSize:"12px", color:"var(--ink-40)", margin:0 }}>Blood Recipient</p>
            </div>
          </div>

          {/* Urgency badge */}
          <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", padding:"4px 10px", borderRadius:"99px", background:urgency.bg, color:urgency.color, fontSize:"11px", fontWeight:700, letterSpacing:"0.05em", textTransform:"uppercase" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:urgency.dot, display:"inline-block" }}/>
            {urgency.label}
          </span>
        </div>

        {/* Divider */}
        <hr style={{ border:"none", borderTop:"1px solid var(--ink-10)", margin:0 }}/>

        {/* Blood type highlight */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", background:"var(--crimson-subtle)", borderRadius:"12px", padding:"14px" }}>
          <div style={{ textAlign:"center" }}>
            <p style={{ fontSize:"11px", fontWeight:600, color:"var(--ink-40)", letterSpacing:"0.06em", textTransform:"uppercase", margin:"0 0 4px" }}>Blood Required</p>
            <p style={{ fontFamily:"oswald,sans-serif", fontSize:"36px", fontWeight:700, color:"var(--crimson)", margin:0, lineHeight:1 }}>{data.bloodType}</p>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          <div style={{ background:"var(--ink-2)", borderRadius:"8px", padding:"10px 12px" }}>
            <p style={{ fontSize:"11px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px" }}>Date</p>
            <p style={{ fontSize:"13px", fontWeight:600, color:"var(--ink)", margin:0 }}>{data.date}</p>
          </div>
          <div style={{ background:"var(--ink-2)", borderRadius:"8px", padding:"10px 12px" }}>
            <p style={{ fontSize:"11px", color:"var(--ink-40)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", margin:"0 0 2px" }}>Time</p>
            <p style={{ fontSize:"13px", fontWeight:600, color:"var(--ink)", margin:0 }}>{data.time}</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => fn(true)}
          className="rh-btn rh-btn-success rh-btn-md"
          style={{ width:"100%", marginTop:"4px" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Donate Blood
        </button>
      </div>
    </>
  );
};

export default DonarCard;
