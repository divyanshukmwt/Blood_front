import React, { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import RequestCard from "../components/RequestCard";
import { UserContext } from "../context/user.context";
import { ClipboardList } from "lucide-react";

const Blood = () => {
  const { user } = useContext(UserContext);
  const [filterData, setFilterData] = useState("allRequest");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (user?.bloodRequest?.length) {
      const filtered = user.bloodRequest.filter(item => filterData==="allRequest"||item.status===filterData);
      const sorted = filtered.sort((a,b)=>{
        const dt=i=>new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);
        return dt(b)-dt(a);
      });
      setFilteredPosts(sorted);
    } else { setFilteredPosts([]); }
  }, [filterData, user?.bloodRequest]);

  const STATUS_COUNTS = {
    all: user?.bloodRequest?.length||0,
    pending: user?.bloodRequest?.filter(r=>r.status==='pending').length||0,
    Accepted: user?.bloodRequest?.filter(r=>r.status==='Accepted').length||0,
  };

  return (
    <div style={{ background:'var(--ash)',minHeight:'100vh' }}>
      <Navbar field={[
        {link:"/users/profile",name:"Profile"},{link:"/",name:"Home"},
        {link:"/donate/request-list",name:"Donate"},{link:"/about",name:"About"},
        {link:"/users/contactUs",name:"Contact Us"},
      ]}/>
      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'96px 24px 48px' }}>
        <div style={{ marginBottom:'32px' }}>
          <p style={{ fontSize:'0.75rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--crimson)',marginBottom:'8px' }}>MY BLOOD REQUESTS</p>
          <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'clamp(1.75rem, 4vw, 2.5rem)',letterSpacing:'-0.02em',marginBottom:'8px' }}>Track your requests</h1>
          <p style={{ color:'var(--muted)',fontSize:'0.95rem' }}>Monitor the status of your blood requests in real time</p>
        </div>
        <div style={{ display:'flex',gap:'10px',marginBottom:'32px',flexWrap:'wrap' }}>
          {[{val:'allRequest',label:'All',count:STATUS_COUNTS.all},{val:'pending',label:'Pending',count:STATUS_COUNTS.pending},{val:'Accepted',label:'Accepted',count:STATUS_COUNTS.Accepted}].map(({val,label,count})=>(
            <button key={val} onClick={()=>setFilterData(val)} style={{ padding:'10px 20px',borderRadius:'10px',border:`1.5px solid ${filterData===val?'var(--crimson)':'var(--border)'}`,background:filterData===val?'var(--crimson-pale)':'white',color:filterData===val?'var(--crimson)':'var(--ink)',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.875rem',transition:'all 0.2s',display:'flex',alignItems:'center',gap:'8px' }}>
              {label}
              <span style={{ padding:'1px 8px',borderRadius:'100px',background:filterData===val?'var(--crimson)':'var(--ash)',color:filterData===val?'white':'var(--muted)',fontSize:'0.75rem',fontWeight:700 }}>{count}</span>
            </button>
          ))}
        </div>
        {filteredPosts.length>0
          ? <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:'20px' }}>
              {filteredPosts.map((item,i)=><RequestCard key={i} user={user} data={item}/>)}
            </div>
          : <div style={{ textAlign:'center',padding:'80px 0',background:'white',borderRadius:'20px',border:'1px solid var(--border)' }}>
              <div style={{ display:'flex',justifyContent:'center',marginBottom:'12px',color:'var(--muted)' }}><ClipboardList size={48} strokeWidth={1}/></div>
              <h3 style={{ fontFamily:'Syne',fontWeight:700,fontSize:'1.25rem',marginBottom:'8px' }}>No requests found</h3>
              <p style={{ color:'var(--muted)',fontSize:'0.9rem' }}>{filterData==='allRequest'?"You haven't made any blood requests yet.":`No ${filterData} requests.`}</p>
            </div>
        }
      </div>
    </div>
  );
};

export default Blood;
