import { useContext, useRef, useState } from "react";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import Cropper from "react-cropper";
import "react-cropper/node_modules/cropperjs/dist/cropper.css";
import { toast } from "react-toastify";

const UploadForm = ({ email, fn }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const cropperRef = useRef(null);
  const { setUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const generatePreview = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) setPreviewUrl(canvas.toDataURL("image/png"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cropper = cropperRef.current?.cropper;
    if (!file || !cropper) return;
    setUploading(true);

    cropper.getCroppedCanvas().toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("profilepic", blob, file.name);
      formData.append("email", email);
      try {
        const res = await Axios.post("/users/picture-upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        fn(false);
        setUser(res.data.cleanedUser);
        toast.success("📸 Photo updated successfully.");
      } catch {
        toast.error("❌ Upload failed. Please try again.");
      } finally { setUploading(false); }
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,13,13,0.6)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-xl)", animation: "rh-slide-up 0.25s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Update Profile Photo</h3>
            <p style={{ fontSize: "13px", color: "var(--ink-40)", margin: "4px 0 0" }}>Crop and upload your new photo</p>
          </div>
          <button onClick={() => fn(false)} style={{ width: 32, height: 32, borderRadius: "8px", background: "var(--ink-5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-60)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label className="rh-label">Choose an image</label>
            <input
              type="file" accept="image/*" onChange={handleFileChange}
              style={{ width: "100%", padding: "10px 14px", background: "var(--ink-2)", border: "1.5px solid var(--ink-10)", borderRadius: "10px", fontSize: "14px", fontFamily: "Poppins,sans-serif", cursor: "pointer" }}
            />
          </div>

          {imageUrl && (
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--ink-10)" }}>
              <Cropper
                src={imageUrl}
                style={{ height: 280, width: "100%" }}
                aspectRatio={1}
                viewMode={1}
                autoCropArea={1}
                background={false}
                responsive={true}
                guides={false}
                ref={cropperRef}
                cropend={generatePreview}
              />
            </div>
          )}

          {previewUrl && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-40)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Preview</p>
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--crimson)", boxShadow: "var(--shadow-crimson)" }}>
                <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => fn(false)} className="rh-btn rh-btn-ghost rh-btn-md" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" disabled={!file || uploading} className="rh-btn rh-btn-primary rh-btn-md" style={{ flex: 1 }}>
              {uploading ? <><span className="rh-spinner" style={{width:16,height:16,borderWidth:2}}/> Uploading...</> : "Save Photo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
