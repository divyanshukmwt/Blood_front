import { useContext, useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import { UserContext } from '../context/user.context';
import UploadForm from '../components/UploadForm';
import BlockInterface from '../components/BlockInterface';
import AddRequest from '../components/AddRequest';
import Stricks from '../components/Stricks';
import DonarStricks from '../components/DonarStricks';
import Form from "../components/Form";
import { receiveMessage } from '../config/Socket';
import { BadgeCheck, Pencil, Droplets, ClipboardList, Heart } from 'lucide-react';

const StatCard = ({ value, label, Icon }) => (
  <div style={{ background:'white',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px',textAlign:'center',flex:1,minWidth:'140px' }}>
    <div style={{ display:'flex',justifyContent:'center',marginBottom:'8px',color:'var(--crimson)' }}><Icon size={20} strokeWidth={1.5}/></div>
    <div style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'2rem',color:'var(--ink)',lineHeight:1 }}>{value}</div>
    <div style={{ fontSize:'0.75rem',color:'var(--muted)',marginTop:'6px',letterSpacing:'0.06em',textTransform:'uppercase' }}>{label}</div>
  </div>
);

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userDets, setUserDets] = useState(user);
  const [picModal, setPicModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    receiveMessage("allPost", d => { setUser(d); setUserDets(d); });
    receiveMessage("reciver-update", d => { setUser(d); setUserDets(d); });
    receiveMessage("updateBlock-center", d => { setUser(d); setUserDets(d); });
  }, []);
  useEffect(() => { setUserDets(user); }, [user]);
  useEffect(() => { if (userDets?.number === null) setFormModal(true); }, [userDets?.number]);

  const sortByDateTime = (arr) => [...(arr||[])].filter(i=>i?.date&&i?.time).sort((a,b)=>{
    const dt = i => new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);
    return dt(b)-dt(a);
  });

  return (
    <>
      {formModal && <Form fn={setFormModal}/>}
      <div style={{ background:'var(--ash)',minHeight:'100vh' }}>
        <Navbar field={[
          { link:"/",name:"Home" },{ link:"/donate/request-list",name:"Donate" },
          { link:"/reciver/blood",name:"Blood" },{ link:"/about",name:"About" },
          { link:"/users/contactUs",name:"Contact Us" },{ link:"/login",name:"Logout" },
        ]} />
        {picModal && <UploadForm fn={setPicModal} email={userDets.email}/>}
        <div style={{ maxWidth:'1000px',margin:'0 auto',padding:'96px 24px 48px' }}>

          {/* Profile Header */}
          <div style={{ background:'white',borderRadius:'24px',padding:'40px',marginBottom:'24px',boxShadow:'var(--card-shadow)',display:'flex',gap:'32px',alignItems:'flex-start',flexWrap:'wrap' }}>
            <div style={{ position:'relative',flexShrink:0 }}>
              <div style={{ width:100,height:100,borderRadius:'50%',overflow:'hidden',border:'3px solid var(--border)',background:'#f0f0f0' }}>
                {userDets?.profilepic && userDets?.pictype
                  ? <img src={`data:${userDets.pictype};base64,${userDets.profilepic}`} alt="Profile" style={{ width:'100%',height:'100%',objectFit:'cover' }}/>
                  : <div style={{ width:'100%',height:'100%',background:'var(--crimson)',display:'flex',alignItems:'center',justifyContent:'center' }}><span style={{ fontFamily:'Syne',fontWeight:800,fontSize:'2rem',color:'white' }}>{userDets?.name?.[0]?.toUpperCase()||'?'}</span></div>
                }
              </div>
              <button onClick={()=>setPicModal(!picModal)} style={{ position:'absolute',bottom:-4,right:-4,width:30,height:30,borderRadius:'50%',background:'var(--crimson)',border:'2px solid white',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>
                <Pencil size={12} color="white" strokeWidth={2.5}/>
              </button>
            </div>

            <div style={{ flex:1,minWidth:'200px' }}>
              <div style={{ display:'flex',alignItems:'center',gap:'10px',marginBottom:'4px' }}>
                <h1 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.5rem',letterSpacing:'-0.02em' }}>{userDets?.name||'Loading...'}</h1>
                {userDets?.verified && <BadgeCheck size={20} style={{ color:'#1D9BF0',flexShrink:0 }}/>}
              </div>
              <p style={{ color:'var(--muted)',fontSize:'0.9rem',marginBottom:'20px' }}>{userDets?.email}</p>
              <div style={{ display:'flex',gap:'12px',flexWrap:'wrap' }}>
                <span style={{ padding:'6px 14px',borderRadius:'100px',background:'var(--crimson-pale)',border:'1px solid rgba(192,21,42,0.2)',color:'var(--crimson)',fontWeight:700,fontSize:'0.9rem' }}>
                  {userDets?.bloodgroup||'—'}
                </span>
                {userDets?.block && <span style={{ padding:'6px 14px',borderRadius:'100px',background:'#FFF3CD',border:'1px solid #FFD600',color:'#856404',fontWeight:600,fontSize:'0.85rem' }}>Account Restricted</span>}
              </div>
            </div>

            <div style={{ display:'flex',gap:'16px',flexWrap:'wrap',width:'100%',marginTop:'8px' }}>
              <StatCard value={userDets?.Donate?.length??0}        label="Donations" Icon={Droplets}     />
              <StatCard value={userDets?.bloodRequest?.length??0}  label="Requests"  Icon={ClipboardList} />
              <StatCard value={userDets?.verified?'Yes':'No'}      label="Verified"  Icon={BadgeCheck}    />
            </div>
          </div>

          {/* Add Request / Block */}
          <div style={{ marginBottom:'24px' }}>
            {userDets?.block === true ? <BlockInterface/> : <AddRequest time={userDets?.delayTime}/>}
          </div>

          {/* Tabs */}
          <div style={{ background:'white',borderRadius:'24px',boxShadow:'var(--card-shadow)',overflow:'hidden' }}>
            <div style={{ display:'flex',borderBottom:'1px solid var(--border)' }}>
              {[['requests','Blood Requests',ClipboardList],['donations','Donations',Heart]].map(([tab,label,Icon])=>(
                <button key={tab} onClick={()=>setActiveTab(tab)} style={{ flex:1,padding:'16px 24px',background:'none',border:'none',cursor:'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:600,fontSize:'0.9rem',color:activeTab===tab?'var(--crimson)':'var(--muted)',borderBottom:activeTab===tab?'2px solid var(--crimson)':'2px solid transparent',transition:'all 0.2s',marginBottom:'-1px',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
                  <Icon size={15} strokeWidth={2}/> {label}
                </button>
              ))}
            </div>
            <div style={{ padding:'24px',maxHeight:'400px',overflowY:'auto' }}>
              {activeTab==='requests' && (
                <div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
                  {sortByDateTime(userDets?.bloodRequest).length>0
                    ?sortByDateTime(userDets?.bloodRequest).map((item,i)=><Stricks key={i} bloodGroup={item.bloodType} date={item.date} time={item.time} status={item.status} id={item._id}/>)
                    :<p style={{ textAlign:'center',color:'var(--muted)',padding:'40px 0',fontSize:'0.9rem' }}>No blood requests yet.</p>}
                </div>
              )}
              {activeTab==='donations' && (
                <div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
                  {sortByDateTime(userDets?.Donate).length>0
                    ?sortByDateTime(userDets?.Donate).map((item,i)=><DonarStricks key={i} bloodGroup={item.bloodType} date={item.date} time={item.time} id={item._id}/>)
                    :<p style={{ textAlign:'center',color:'var(--muted)',padding:'40px 0',fontSize:'0.9rem' }}>No donations yet.</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
