import React, { useState } from "react";
import Navbar from "../utils/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader2 from "../components/Loader2";
import Testimonials from "./Testimonials";
import {
  Droplets, Users, Clock, TrendingUp,
  UserPlus, Search, Handshake,
  HeartPulse, CalendarDays, Zap, Hospital,
  ArrowRight,
} from "lucide-react";

const STATS = [
  { value: "10K+", label: "Lives Saved",    Icon: Droplets    },
  { value: "5K+",  label: "Active Donors",  Icon: Users       },
  { value: "48hr", label: "Avg Response",   Icon: Clock       },
  { value: "98%",  label: "Success Rate",   Icon: TrendingUp  },
];

const ORBS = [
  { size: 140, top: '8%',  left: '15%', opacity: 0.9, delay: '0s',    dur: '6s'  },
  { size: 90,  top: '5%',  left: '62%', opacity: 0.6, delay: '0.8s',  dur: '7s'  },
  { size: 60,  top: '38%', left: '5%',  opacity: 0.4, delay: '1.4s',  dur: '5s'  },
  { size: 110, top: '55%', left: '55%', opacity: 0.7, delay: '0.3s',  dur: '8s'  },
  { size: 50,  top: '72%', left: '20%', opacity: 0.35,delay: '2s',    dur: '6.5s'},
  { size: 75,  top: '20%', left: '80%', opacity: 0.5, delay: '1s',    dur: '7.5s'},
  { size: 45,  top: '82%', left: '75%', opacity: 0.3, delay: '1.6s',  dur: '5.5s'},
  { size: 65,  top: '45%', left: '40%', opacity: 0.25,delay: '0.5s',  dur: '9s'  },
];

const HOW_STEPS = [
  { num: "01", title: "Create your profile",    desc: "Register with your blood group and location. Takes under 2 minutes.", Icon: UserPlus  },
  { num: "02", title: "Post or Browse requests",desc: "Instantly post a blood request or browse donors near you in real time.", Icon: Search    },
  { num: "03", title: "Connect & Donate",       desc: "Get matched with a compatible donor and coordinate the donation.", Icon: Handshake },
];

const AWARENESS = [
  { title: "One donation saves 3 lives",       Icon: HeartPulse  },
  { title: "You can donate every 56 days",     Icon: CalendarDays},
  { title: "Only 7% of people have O−",        Icon: Zap         },
  { title: "Blood cannot be manufactured",     Icon: Hospital    },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (loading) {
    return <Loader2 onComplete={() => setLoading(false)} />;
  }

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/users/profile",       name: "Profile"    },
        { link: "/donate/request-list", name: "Donate"     },
        { link: "/reciver/blood",       name: "Blood"      },
        { link: "/about",               name: "About"      },
        { link: "/users/contactUs",     name: "Contact Us" },
      ]} />

      {/* HERO */}
      <section style={{
        minHeight: '100vh', background: 'var(--ink)', position: 'relative',
        overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '120px 0 80px',
      }}>
        <div style={{ position:'absolute',top:'-20%',right:'-10%',width:'60vw',height:'60vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(192,21,42,0.15) 0%,transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'-10%',left:'-5%',width:'40vw',height:'40vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(192,21,42,0.08) 0%,transparent 70%)',pointerEvents:'none' }} />

        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 40px',width:'100%' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'80px',alignItems:'center' }} className="hero-grid">
            {/* Text */}
            <div style={{ animation:'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both' }}>
              {/* <div style={{
                display:'inline-flex',alignItems:'center',gap:'8px',
                background:'rgba(192,21,42,0.15)',border:'1px solid rgba(192,21,42,0.3)',
                borderRadius:'100px',padding:'6px 14px',marginBottom:'28px',
              }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--crimson)',display:'inline-block',animation:'pulse-ring 2s infinite' }} />
                <span style={{ color:'#F08090',fontSize:'0.78rem',fontWeight:600,letterSpacing:'0.05em' }}>
                  INDIA'S BLOOD DONATION PLATFORM
                </span>
              </div> */}

              <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(3rem, 7vw, 5.5rem)',color:'white',lineHeight:1.0,letterSpacing:'-0.03em',marginBottom:'28px' }}>
                Give blood.<br />
                <span style={{ color:'var(--crimson-light)' }}>Give life.</span>
              </h1>

              <p style={{ color:'rgba(255,255,255,0.6)',fontSize:'1.125rem',lineHeight:1.7,maxWidth:'460px',marginBottom:'40px' }}>
                Every 2 seconds someone needs blood. Be the reason a mother comes home,
                a child laughs again, a stranger lives to see tomorrow.
              </p>

              <div style={{ display:'flex',gap:'16px',flexWrap:'wrap' }}>
                <button onClick={() => navigate('/users/profile')} style={{
                  padding:'14px 28px',borderRadius:'10px',background:'var(--crimson)',color:'white',
                  border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.95rem',
                  transition:'all 0.25s',boxShadow:'0 4px 24px rgba(192,21,42,0.4)',
                  display:'flex',alignItems:'center',gap:'8px',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(192,21,42,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 24px rgba(192,21,42,0.4)'; }}
                >
                  Start Donating <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('/donate/request-list')} style={{
                  padding:'14px 28px',borderRadius:'10px',background:'rgba(255,255,255,0.08)',
                  border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.85)',
                  cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.95rem',transition:'all 0.25s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                >
                  Browse Requests
                </button>
              </div>
            </div>

            {/* Floating orbs visual */}
            <div style={{ position:'relative',width:'100%',aspectRatio:'1',animation:'fade-up 0.8s 0.2s cubic-bezier(0.22,1,0.36,1) both' }} className="hero-visual">
              <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.06 }} viewBox="0 0 400 400">
                {[0,1,2,3,4,5].map(i => <line key={`h${i}`} x1="0" y1={i*80} x2="400" y2={i*80} stroke="white" strokeWidth="0.5"/>)}
                {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={i*80} y1="0" x2={i*80} y2="400" stroke="white" strokeWidth="0.5"/>)}
              </svg>
              {ORBS.map((orb, i) => (
                <div key={i} style={{
                  position:'absolute',top:orb.top,left:orb.left,width:orb.size,height:orb.size,
                  borderRadius:'50%',
                  background: i === 0 ? 'radial-gradient(circle at 35% 35%,rgba(232,25,47,0.9),rgba(140,8,24,0.85))'
                    : i === 3 ? 'radial-gradient(circle at 35% 35%,rgba(192,21,42,0.6),rgba(100,5,18,0.5))'
                    : 'radial-gradient(circle at 35% 35%,rgba(255,255,255,0.12),rgba(255,255,255,0.04))',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  opacity:orb.opacity,
                  animation:`float ${orb.dur} ${orb.delay} ease-in-out infinite`,
                  boxShadow: i === 0 ? '0 0 60px rgba(192,21,42,0.4),inset 0 1px 0 rgba(255,255,255,0.2)' : 'none',
                }} />
              ))}
              <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:200,height:200,borderRadius:'50%',border:'1px solid rgba(192,21,42,0.2)',animation:'expand-ring 3s ease-out infinite' }} />
              <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:200,height:200,borderRadius:'50%',border:'1px solid rgba(192,21,42,0.1)',animation:'expand-ring 3s 1s ease-out infinite' }} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background:'var(--crimson)',padding:'40px 0' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 40px' }}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'32px',textAlign:'center' }} className="stats-grid">
            {STATS.map(({ value, label, Icon }, i) => (
              <div key={i}>
                <Icon size={20} color="rgba(255,255,255,0.6)" style={{ margin:'0 auto 8px' }} />
                <div style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'2.5rem',color:'white',lineHeight:1 }}>{value}</div>
                <div style={{ fontSize:'0.8rem',color:'rgba(255,255,255,0.7)',marginTop:'6px',letterSpacing:'0.05em',textTransform:'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:'100px 0',background:'var(--white)' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 40px' }}>
          <div style={{ textAlign:'center',marginBottom:'64px' }}>
            <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--crimson)',marginBottom:'12px' }}>HOW IT WORKS</p>
            <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(2rem, 4vw, 3rem)',letterSpacing:'-0.02em' }}>Three steps to save a life</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'32px' }} className="steps-grid">
            {HOW_STEPS.map(({ num, title, desc, Icon }, i) => (
              <div key={i} style={{
                padding:'40px 32px',border:'1px solid var(--border)',borderRadius:'20px',background:'var(--white)',
                transition:'all 0.3s',position:'relative',overflow:'hidden',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--card-shadow-hover)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='transparent'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='var(--border)'; }}
              >
                <div style={{ position:'absolute',top:'20px',right:'24px',fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'4rem',color:'var(--ash)',lineHeight:1,letterSpacing:'-0.04em' }}>{num}</div>
                <div style={{ marginBottom:'20px',color:'var(--crimson)' }}><Icon size={32} strokeWidth={1.5} /></div>
                <h3 style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'1.25rem',marginBottom:'12px' }}>{title}</h3>
                <p style={{ color:'var(--muted)',fontSize:'0.9rem',lineHeight:1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARENESS CARDS */}
      <section style={{ padding:'80px 0',background:'var(--ash)' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'0 40px' }}>
          <div style={{ textAlign:'center',marginBottom:'48px' }}>
            <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--crimson)',marginBottom:'12px' }}>DID YOU KNOW</p>
            <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(1.75rem, 3.5vw, 2.5rem)',letterSpacing:'-0.02em' }}>Facts that matter</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',gap:'20px' }}>
            {AWARENESS.map(({ title, Icon }, i) => (
              <div key={i} style={{ background:'white',borderRadius:'16px',padding:'32px 24px',border:'1px solid var(--border)',textAlign:'center',transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--card-shadow-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
              >
                <div style={{ display:'flex',justifyContent:'center',marginBottom:'16px',color:'var(--crimson)' }}><Icon size={32} strokeWidth={1.5} /></div>
                <p style={{ fontFamily:'Syne, sans-serif',fontWeight:700,fontSize:'1rem',color:'var(--ink)',lineHeight:1.4 }}>{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'100px 40px',background:'var(--ink)',textAlign:'center',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(192,21,42,0.2) 0%,transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'relative',zIndex:1 }}>
          <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(2.5rem, 5vw, 4rem)',color:'white',letterSpacing:'-0.03em',marginBottom:'20px' }}>Ready to be a hero?</h2>
          <p style={{ color:'rgba(255,255,255,0.55)',fontSize:'1.1rem',marginBottom:'40px',maxWidth:'480px',margin:'0 auto 40px' }}>
            Join thousands of donors across India who save lives every single day.
          </p>
          <button onClick={() => navigate('/register')} style={{
            padding:'16px 36px',borderRadius:'12px',background:'var(--crimson)',color:'white',
            border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'1rem',
            transition:'all 0.25s',boxShadow:'0 4px 24px rgba(192,21,42,0.5)',
            display:'inline-flex',alignItems:'center',gap:'10px',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 40px rgba(192,21,42,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 24px rgba(192,21,42,0.5)'; }}
          >
            Join RedHope Today <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Testimonials embedded />
      <Footer />

      <style>{`
        @keyframes expand-ring {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.5; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
        }
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-visual { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
