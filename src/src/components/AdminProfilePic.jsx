import { useContext, useState } from "react";
import Axios from "../config/Axois";
import { AdminContext } from "../context/admin.context";
import { toast } from "react-toastify";

const AdminProfilePic = ({ email, fn }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { setAdmin } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("profilepic", file);
    formData.append("email", email);
    try {
      const res = await Axios.post("/admin/adminPic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      fn(false);
      setAdmin(res.data.Useradmin);
      toast.success("📸 Photo updated successfully!");
    } catch {
      toast.error("❌ Upload failed. Please try again.");
    } finally { setUploading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,13,13,0.6)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "420px", boxShadow: "var(--shadow-xl)", animation: "rh-slide-up 0.25s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Update Admin Photo</h3>
          <button onClick={() => fn(false)} style={{ width: 32, height: 32, borderRadius: "8px", background: "var(--ink-5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-60)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label className="rh-label">Select image file</label>
            <input
              type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}
              style={{ width: "100%", padding: "10px 14px", background: "var(--ink-2)", border: "1.5px solid var(--ink-10)", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontFamily: "Poppins,sans-serif" }}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => fn(false)} className="rh-btn rh-btn-ghost rh-btn-md" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" disabled={!file || uploading} className="rh-btn rh-btn-primary rh-btn-md" style={{ flex: 1 }}>
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePic;
