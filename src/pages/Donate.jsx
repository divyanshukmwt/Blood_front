import { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import DonarCard from "../components/DonarCard";
import Axios from "../config/Axois";
import { DonarContext } from "../context/donate.context";
import { receiveMessage } from "../config/Socket";
import { Search, Droplets } from "lucide-react";

const Donate = () => {
  const { DonatePost, setDonatePost } = useContext(DonarContext);
  const [post, SetPost] = useState(DonatePost);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.post("/donar/donateDets");
        const sorted = [...res.data].sort((a,b)=>new Date(b.date)-new Date(a.date));
        setDonatePost(sorted); SetPost(sorted);
      } catch(err){console.error(err);}
    };
    fetchData();
    receiveMessage("newUpdate",data=>{if(data){const s=[...data].sort((a,b)=>new Date(b.date)-new Date(a.date));setDonatePost(s);SetPost(s);}});
    receiveMessage("new-post",data=>{const s=[...data].sort((a,b)=>new Date(b.date)-new Date(a.date));setDonatePost(s);SetPost(s);});
  }, []);

  const filteredPost = post
    .sort((a,b)=>{const dt=i=>new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);return dt(b)-dt(a);})
    .filter(item=>{
      const matchSearch=!search||item.reciventId?.name?.toLowerCase().includes(search.toLowerCase())||item.bloodType?.toLowerCase().includes(search.toLowerCase());
      const matchUrgency=urgencyFilter==='all'||item.urgency?.toLowerCase()===urgencyFilter;
      return matchSearch&&matchUrgency;
    });

  return (
    <div style={{ background:'var(--ash)',minHeight:'100vh' }}>
      <Navbar field={[
        {link:"/users/profile",name:"Profile"},{link:"/",name:"Home"},
        {link:"/reciver/blood",name:"Blood"},{link:"/about",name:"About"},
        {link:"/users/contactUs",name:"Contact Us"},
      ]}/>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'96px 24px 48px' }}>
        <div style={{ marginBottom:'32px' }}>
          <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--crimson)',marginBottom:'8px' }}>ACTIVE REQUESTS</p>
          <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(1.75rem, 4vw, 2.5rem)',letterSpacing:'-0.02em',marginBottom:'8px' }}>People who need blood</h1>
          <p style={{ color:'var(--muted)',fontSize:'0.95rem' }}>{filteredPost.length} active request{filteredPost.length!==1?'s':''} — match with someone today</p>
        </div>

        <div style={{ display:'flex',gap:'12px',marginBottom:'32px',flexWrap:'wrap' }}>
          <div style={{ position:'relative',flex:'1 1 240px',minWidth:'200px' }}>
            <input placeholder="Search by name or blood type…" value={search} onChange={e=>setSearch(e.target.value)}
              style={{ width:'100%',padding:'10px 16px 10px 40px',borderRadius:'10px',border:'1.5px solid var(--border)',background:'white',fontSize:'0.9rem',outline:'none',fontFamily:'DM Sans, sans-serif' }}
            />
            <Search size={15} style={{ position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'var(--muted)' }}/>
          </div>
          <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
            {[['all','All'],['high','High'],['medium','Medium'],['low','Low']].map(([v,l])=>(
              <button key={v} onClick={()=>setUrgencyFilter(v)} style={{ padding:'10px 16px',borderRadius:'10px',border:'1.5px solid',borderColor:urgencyFilter===v?'var(--crimson)':'var(--border)',background:urgencyFilter===v?'var(--crimson-pale)':'white',color:urgencyFilter===v?'var(--crimson)':'var(--ink)',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.82rem',transition:'all 0.2s',whiteSpace:'nowrap' }}>{l}</button>
            ))}
          </div>
        </div>

        {filteredPost.length>0
          ? <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:'20px' }}>
              {filteredPost.map((item,i)=><DonarCard key={i} btn={modal===item._id} fn={state=>setModal(state?item._id:null)} data={item}/>)}
            </div>
          : <div style={{ textAlign:'center',padding:'80px 0' }}>
              <div style={{ display:'flex',justifyContent:'center',marginBottom:'16px',color:'var(--muted)' }}><Droplets size={48} strokeWidth={1}/></div>
              <h3 style={{ fontFamily:'Syne',fontWeight:700,fontSize:'1.25rem',marginBottom:'8px' }}>No requests found</h3>
              <p style={{ color:'var(--muted)',fontSize:'0.9rem' }}>Try adjusting your filters</p>
            </div>
        }
      </div>
    </div>
  );
};

export default Donate;
