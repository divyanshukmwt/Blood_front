import DonateForm from './DonateForm';
import { Droplets, ArrowRight } from 'lucide-react';

const URGENCY_STYLES = {
  high:   { bg:'#FFF0F2',border:'rgba(192,21,42,0.2)',color:'var(--crimson)',dot:'#C0152A',label:'High' },
  Medium: { bg:'#FFFBEA',border:'rgba(184,92,0,0.2)', color:'var(--warning)',dot:'#B85C00',label:'Medium' },
  Low:    { bg:'#F0FDF4',border:'rgba(13,122,78,0.2)', color:'var(--success)',dot:'#0D7A4E',label:'Low' },
};

const DonarCard = ({ data, btn, fn }) => {
  const urgency = URGENCY_STYLES[data.urgency] || URGENCY_STYLES.Low;
  return (
    <>
      <DonateForm modal={btn} dataId={data._id} modalfn={fn} name={data.reciventId?.name}/>
      <div style={{ background:'white',borderRadius:'16px',border:'1px solid var(--border)',padding:'24px',transition:'all 0.3s',display:'flex',flexDirection:'column',gap:'16px' }}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--card-shadow-hover)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor='transparent';}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='var(--border)';}}
      >
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'12px' }}>
            <div style={{ width:44,height:44,borderRadius:'50%',overflow:'hidden',border:'2px solid var(--border)',background:'var(--ash)',flexShrink:0 }}>
              {data.reciventId?.profilepic
                ? <img src={`data:${data.reciventId.pictype};base64,${data.reciventId.profilepic}`} alt="Profile" style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
                : <div style={{ width:'100%',height:'100%',background:'var(--crimson)',display:'flex',alignItems:'center',justifyContent:'center' }}><span style={{ fontFamily:'Syne',fontWeight:800,color:'white',fontSize:'1rem' }}>{data.reciventId?.name?.[0]||'?'}</span></div>
              }
            </div>
            <div>
              <p style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'0.95rem' }}>{data.reciventId?.name}</p>
              <p style={{ fontSize:'0.75rem',color:'var(--muted)' }}>Blood receiver</p>
            </div>
          </div>
          <div style={{ padding:'4px 10px',borderRadius:'100px',background:urgency.bg,border:`1px solid ${urgency.border}`,display:'flex',alignItems:'center',gap:'5px' }}>
            <span style={{ width:6,height:6,borderRadius:'50%',background:urgency.dot,display:'inline-block' }}/>
            <span style={{ color:urgency.color,fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase' }}>{urgency.label}</span>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',background:'var(--ash)',borderRadius:'10px',padding:'14px' }}>
          <div>
            <p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'3px' }}>BLOOD NEEDED</p>
            <p style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.25rem',color:'var(--crimson)' }}>{data.bloodType}</p>
          </div>
          <div>
            <p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'3px' }}>DATE</p>
            <p style={{ fontWeight:600,fontSize:'0.875rem' }}>{data.date}</p>
          </div>
          <div style={{ gridColumn:'1 / -1' }}>
            <p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'3px' }}>TIME</p>
            <p style={{ fontWeight:600,fontSize:'0.875rem' }}>{data.time}</p>
          </div>
        </div>

        <button onClick={()=>fn(true)} style={{ padding:'12px',borderRadius:'10px',background:'var(--crimson)',color:'white',border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.9rem',transition:'all 0.2s',boxShadow:'0 2px 12px rgba(192,21,42,0.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--crimson-dark)';e.currentTarget.style.transform='translateY(-1px)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='var(--crimson)';e.currentTarget.style.transform='none';}}
        >
          <Droplets size={14}/> Donate Blood <ArrowRight size={14}/>
        </button>
      </div>
    </>
  );
};

export default DonarCard;
