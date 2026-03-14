import { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import DonarCard from "../components/DonarCard";
import Axios from "../config/Axois";
import { DonarContext } from "../context/donate.context";
import { receiveMessage } from "../config/Socket";

const Donate = () => {
  const { DonatePost, setDonatePost } = useContext(DonarContext);
  const [post, setPost] = useState(DonatePost);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const sortByDate = arr => [...arr].sort((a, b) => {
    const dt = i => new Date(`${i.date.split("/").reverse().join("-")} ${i.time}`);
    return dt(b) - dt(a);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.post("/donar/donateDets");
        const sorted = sortByDate(res.data);
        setDonatePost(sorted);
        setPost(sorted);
      } catch (err) {
        console.error("Error fetching donation data:", err);
      }
    };
    fetchData();

    receiveMessage("newUpdate", (data) => {
      if (data) { const s = sortByDate(data); setDonatePost(s); setPost(s); }
    });
    receiveMessage("new-post", (data) => {
      const s = sortByDate(data); setDonatePost(s); setPost(s);
    });
  }, []);

  const urgencyOptions = ["all", "high", "Medium", "Low"];

  const filteredPosts = post.filter(item => {
    const matchFilter = filter === "all" || item.urgency === filter;
    const matchSearch = !searchTerm || item.reciventId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || item.bloodType?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const urgencyColors = { high:"var(--crimson)", Medium:"var(--warning)", Low:"var(--success)", all:"var(--ink-60)" };

  return (
    <div className="rh-page" style={{ background:"var(--ink-2)" }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/", name: "Home" },
        { link: "/reciver/blood", name: "My Requests" },
        { link: "/about", name: "About" },
        { link: "/users/contactUs", name: "Contact" },
      ]} />

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"32px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom:"28px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
            <div style={{ width:36, height:36, background:"var(--crimson)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 5 9.5 5 14.5C5 18.09 8.13 21 12 21C15.87 21 19 18.09 19 14.5C19 9.5 12 2 12 2Z" fill="white"/></svg>
            </div>
            <h1 style={{ fontFamily:"oswald,sans-serif", fontSize:"30px", fontWeight:700, color:"var(--ink)", margin:0 }}>Donation Requests</h1>
          </div>
          <p style={{ color:"var(--ink-40)", fontSize:"14px", marginTop:0 }}>
            {post.length} people need blood right now — be their hero today
          </p>
        </div>

        {/* Controls */}
        <div style={{ display:"flex", gap:"12px", marginBottom:"24px", flexWrap:"wrap", alignItems:"center" }}>
          {/* Search */}
          <div style={{ position:"relative", flex:"1", minWidth:"200px" }}>
            <svg style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:"var(--ink-20)", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search by name or blood type..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width:"100%", padding:"10px 16px 10px 38px", background:"#fff", border:"1.5px solid var(--ink-10)", borderRadius:"10px", fontSize:"14px", fontFamily:"Poppins,sans-serif", outline:"none", color:"var(--ink)", transition:"border-color 200ms ease" }}
              onFocus={e => { e.target.style.borderColor = "var(--crimson)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--ink-10)"; }}
            />
          </div>

          {/* Urgency filter pills */}
          <div style={{ display:"flex", gap:"6px" }}>
            {urgencyOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                style={{
                  padding:"9px 14px", borderRadius:"99px",
                  background: filter === opt ? urgencyColors[opt] : "#fff",
                  color: filter === opt ? "#fff" : urgencyColors[opt],
                  border: `1.5px solid ${urgencyColors[opt]}`,
                  cursor:"pointer", fontSize:"13px", fontWeight:600,
                  fontFamily:"Poppins,sans-serif", transition:"all 150ms ease",
                  textTransform: opt === "all" ? "capitalize" : "none",
                }}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {searchTerm && (
          <p style={{ fontSize:"13px", color:"var(--ink-40)", marginBottom:"16px" }}>
            {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""} for "{searchTerm}"
          </p>
        )}

        {/* Cards */}
        {filteredPosts.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:"16px" }}>
            {filteredPosts.map((item, index) => (
              <DonarCard
                key={index}
                btn={modal === item._id}
                fn={(state) => setModal(state ? item._id : null)}
                data={item}
              />
            ))}
          </div>
        ) : (
          <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid var(--ink-10)", padding:"80px 40px", textAlign:"center" }}>
            <div style={{ fontSize:"56px", marginBottom:"16px" }}>🩸</div>
            <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"22px", color:"var(--ink-40)", margin:"0 0 8px" }}>No Requests Found</h3>
            <p style={{ color:"var(--ink-20)", fontSize:"14px", margin:0 }}>
              {post.length === 0 ? "No donation requests at this time." : "Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
