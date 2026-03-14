import { useContext, useState } from 'react';
import Navbar from '../utils/Navbar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import { UserContext } from '../context/user.context';
import { toast } from 'react-toastify';
import Axios from "../config/Axois";
import AbandonWord from "../utils/AbandonWord";
import { Mail, Clock, Globe, ArrowRight } from 'lucide-react';

const ContactUs = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await Axios.post("/users/contactUs",{name:user.name,email:user.email,message:data.message});
      if(res.status===200){toast.success("Message sent successfully!");reset();navigate("/users/profile");}
      else toast.error("Something went wrong!");
    } catch { toast.error("Failed to send message."); }
    finally { setLoading(false); }
  };

  const inputStyle = (hasError) => ({
    width:'100%',padding:'12px 16px',borderRadius:'10px',
    border:`1.5px solid ${hasError?'var(--crimson)':'var(--border)'}`,
    background:'var(--ash)',fontSize:'0.95rem',outline:'none',
    fontFamily:'DM Sans, sans-serif',transition:'border-color 0.2s',
  });

  const INFO = [
    { Icon: Mail,  label:'Email',         value:'codxdot@gmail.com', href:'mailto:codxdot@gmail.com' },
    { Icon: Clock, label:'Response time', value:'Within 24 hours',   href:null },
    { Icon: Globe, label:'Coverage',      value:'All across India',  href:null },
  ];

  return (
    <div style={{ background:'var(--ash)',minHeight:'100vh' }}>
      <Navbar field={[{link:"/users/profile",name:"Profile"},{link:"/",name:"Home"},{link:"/donate/request-list",name:"Donate"},{link:"/reciver/blood",name:"Blood"},{link:"/about",name:"About"}]}/>
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'96px 24px 64px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'start' }} className="contact-grid">
          <div>
            <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--crimson)',marginBottom:'12px' }}>GET IN TOUCH</p>
            <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(2rem, 4vw, 3rem)',letterSpacing:'-0.025em',lineHeight:1.1,marginBottom:'20px' }}>We'd love to<br/>hear from you</h1>
            <p style={{ color:'var(--muted)',fontSize:'1rem',lineHeight:1.7,marginBottom:'40px' }}>Have a question, feedback, or need help? Our team is here to support you.</p>
            {INFO.map(({Icon,label,value,href},i)=>(
              <div key={i} style={{ display:'flex',gap:'16px',marginBottom:'24px',alignItems:'flex-start' }}>
                <div style={{ width:44,height:44,borderRadius:'12px',background:'var(--crimson-pale)',border:'1px solid rgba(192,21,42,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'var(--crimson)' }}>
                  <Icon size={18} strokeWidth={1.5}/>
                </div>
                <div>
                  <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'2px' }}>{label}</p>
                  {href
                    ? <a href={href} style={{ color:'var(--ink)',fontWeight:500,textDecoration:'none',fontSize:'0.95rem' }}>{value}</a>
                    : <p style={{ color:'var(--ink)',fontWeight:500,fontSize:'0.95rem' }}>{value}</p>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:'white',borderRadius:'20px',padding:'40px',boxShadow:'var(--card-shadow)' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
              <div>
                <label style={{ display:'block',fontSize:'0.8rem',fontWeight:600,letterSpacing:'0.04em',marginBottom:'8px' }}>YOUR NAME</label>
                <input {...register("name")} type="text" value={user?.name||''} readOnly style={{ ...inputStyle(false),background:'#f8f7f6',cursor:'not-allowed',color:'var(--muted)' }}/>
              </div>
              <div>
                <label style={{ display:'block',fontSize:'0.8rem',fontWeight:600,letterSpacing:'0.04em',marginBottom:'8px' }}>EMAIL</label>
                <input {...register("email")} type="email" value={user?.email||''} readOnly style={{ ...inputStyle(false),background:'#f8f7f6',cursor:'not-allowed',color:'var(--muted)' }}/>
              </div>
              <div>
                <label style={{ display:'block',fontSize:'0.8rem',fontWeight:600,letterSpacing:'0.04em',marginBottom:'8px' }}>MESSAGE</label>
                <textarea id="message" {...register("message",{ required:"Please write a message",validate:v=>!AbandonWord.some(b=>v.toLowerCase().includes(b))||"Message contains restricted words" })}
                  placeholder="How can we help you?" rows={5}
                  style={{ ...inputStyle(errors.message),resize:'vertical',fontFamily:'DM Sans, sans-serif' }}
                  onFocus={e=>e.target.style.borderColor='var(--crimson)'}
                  onBlur={e=>e.target.style.borderColor=errors.message?'var(--crimson)':'var(--border)'}
                />
                {errors.message && <p style={{ color:'var(--crimson)',fontSize:'0.78rem',marginTop:'5px' }}>{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={loading} onClick={e=>{e.preventDefault();handleSubmit(onSubmit)();}}
                style={{ padding:'14px',borderRadius:'10px',background:loading?'var(--muted)':'var(--crimson)',color:'white',border:'none',cursor:loading?'not-allowed':'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.95rem',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
                {loading?'Sending…':<><span>Send message</span><ArrowRight size={16}/></>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
      <style>{`@media(max-width:767px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
};

export default ContactUs;
