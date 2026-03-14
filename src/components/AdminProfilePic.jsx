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
      toast.success("Profile photo updated!");
    } catch {
      toast.error("Something went wrong.");
    } finally { setUploading(false); }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15,13,12,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }} onClick={e => { if (e.target === e.currentTarget) fn(false); }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '40px',
        width: '100%', maxWidth: '400px',
        animation: 'fade-up 0.3s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
      }}>
        <button onClick={() => fn(false)} style={{
          position: 'absolute', top: '20px', right: '20px',
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--ash)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📸</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>Update Admin Photo</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '28px' }}>Choose a new profile photo for the admin account.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{
            display: 'block', padding: '24px', borderRadius: '12px',
            border: '2px dashed var(--border)', background: 'var(--ash)',
            textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.background = 'var(--crimson-pale)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--ash)'; }}
          >
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
            <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
              {file ? `✓ ${file.name}` : 'Click to choose a photo'}
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>PNG, JPG or WebP</p>
          </label>

          <button type="submit" disabled={!file || uploading} style={{
            padding: '13px', borderRadius: '10px',
            background: !file || uploading ? 'var(--muted)' : 'var(--crimson)',
            color: 'white', border: 'none',
            cursor: !file || uploading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
          }}>
            {uploading ? 'Uploading…' : 'Save Photo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePic;
