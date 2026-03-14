import React, { useContext } from 'react';
import { receiveMessage, sendMessage } from "../config/Socket";
import { AllUsersContext } from '../context/AllUsers.context';
import { toast } from 'react-toastify';

const UserCard = ({ data }) => {
  const { setAllUsers } = useContext(AllUsersContext);

  const blockHandler = (id) => {
    sendMessage("blockUnblock-user", id);
    receiveMessage("Update-blockUser", (data) => setAllUsers(data));
    toast.success("✅ User status updated.");
  };

  return (
    <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:"14px" }}>
      {/* User info */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{
          width:48, height:48, borderRadius:"12px", overflow:"hidden", flexShrink:0,
          background:"var(--ink-5)",
          backgroundImage:"url('https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png')",
          backgroundSize:"cover", backgroundPosition:"center",
        }}>
          <img
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
            src={`data:${data.pictype};base64,${data.profilepic}`}
            alt={data.name}
          />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontFamily:"Poppins,sans-serif", fontSize:"14px", fontWeight:600, color:"var(--ink)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{data.name}</p>
          <p style={{ fontSize:"12px", color:"var(--ink-40)", margin:"2px 0 0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{data.email}</p>
        </div>
        <span style={{
          padding:"3px 10px", borderRadius:"99px",
          background: data.block ? "var(--danger-bg)" : "var(--success-bg)",
          color: data.block ? "var(--crimson)" : "var(--success)",
          fontSize:"10px", fontWeight:700, letterSpacing:"0.05em", textTransform:"uppercase", flexShrink:0,
        }}>
          {data.block ? "Blocked" : "Active"}
        </span>
      </div>

      {data.bloodgroup && (
        <div style={{ display:"flex", gap:"6px" }}>
          <span style={{ background:"var(--crimson-muted)", color:"var(--crimson)", borderRadius:"6px", padding:"3px 10px", fontSize:"12px", fontWeight:700, fontFamily:"oswald,sans-serif" }}>
            🩸 {data.bloodgroup}
          </span>
        </div>
      )}

      <button
        onClick={() => blockHandler(data._id)}
        style={{
          width:"100%", padding:"8px 14px", borderRadius:"8px",
          background: data.block ? "var(--info-bg)" : "var(--crimson-muted)",
          color: data.block ? "var(--info)" : "var(--crimson)",
          border: data.block ? "1px solid rgba(21,101,192,0.2)" : "1px solid rgba(192,21,42,0.2)",
          cursor:"pointer", fontSize:"13px", fontWeight:600, fontFamily:"Poppins,sans-serif",
          transition:"all 150ms ease",
        }}
        onMouseEnter={e => { e.target.style.opacity = "0.8"; }}
        onMouseLeave={e => { e.target.style.opacity = "1"; }}
      >
        {data.block ? "Unblock User" : "Block User"}
      </button>
    </div>
  );
};

export default UserCard;
