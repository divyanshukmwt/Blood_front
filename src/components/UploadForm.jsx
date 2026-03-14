import { useContext, useRef, useState } from "react";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import Cropper from "react-cropper";
import "react-cropper/node_modules/cropperjs/dist/cropper.css";
import { toast } from "react-toastify";
import { X, Camera, Upload } from "lucide-react";

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
    if(selected){const reader=new FileReader();reader.onload=()=>setImageUrl(reader.result);reader.readAsDataURL(selected);}
  };

  const generatePreview = () => {
    const cropper = cropperRef.current?.cropper;
    if(cropper){const canvas=cropper.getCroppedCanvas();if(canvas)setPreviewUrl(canvas.toDataURL("image/png"));}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cropper = cropperRef.current?.cropper;
    if(!file||!cropper)return;
    setUploading(true);
    cropper.getCroppedCanvas().toBlob(async(blob)=>{
      const formData=new FormData();
      formData.append("profilepic",blob,file.name);
      formData.append("email",email);
      try{
        const res=await Axios.post("/users/picture-upload",formData,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true});
        fn(false);setUser(res.data.cleanedUser);toast.success("Profile photo updated!");
      }catch{toast.error("Upload failed. Try again.");}
      finally{setUploading(false);}
    });
  };

  return (
    <div style={{ position:'fixed',inset:0,zIndex:1000,background:'rgba(15,13,12,0.7)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px' }}
      onClick={e=>{if(e.target===e.currentTarget)fn(false);}}>
      <div style={{ background:'white',borderRadius:'24px',padding:'40px',width:'100%',maxWidth:'500px',animation:'fade-up 0.3s cubic-bezier(0.22,1,0.36,1)',position:'relative' }}>
        <button onClick={()=>fn(false)} style={{ position:'absolute',top:'20px',right:'20px',width:32,height:32,borderRadius:'50%',background:'var(--ash)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)' }}>
          <X size={14}/>
        </button>
        <div style={{ marginBottom:'16px',color:'var(--crimson)' }}><Camera size={32} strokeWidth={1.5}/></div>
        <h2 style={{ fontFamily:'Syne, sans-serif',fontWeight:800,fontSize:'1.4rem',letterSpacing:'-0.02em',marginBottom:'6px' }}>Update Profile Photo</h2>
        <p style={{ color:'var(--muted)',fontSize:'0.875rem',marginBottom:'28px' }}>Upload a photo, then crop it to fit your profile.</p>
        <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',gap:'20px' }}>
          <label style={{ display:'block',padding:'24px',borderRadius:'12px',border:'2px dashed var(--border)',background:'var(--ash)',textAlign:'center',cursor:'pointer',transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--crimson)';e.currentTarget.style.background='var(--crimson-pale)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='var(--ash)';}}>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display:'none' }}/>
            <Upload size={20} style={{ margin:'0 auto 8px',color:'var(--muted)',display:'block' }}/>
            <p style={{ fontWeight:600,fontSize:'0.9rem',marginBottom:'4px' }}>{file?`Selected: ${file.name}`:'Click to choose a photo'}</p>
            <p style={{ color:'var(--muted)',fontSize:'0.78rem' }}>PNG, JPG or WebP</p>
          </label>
          {imageUrl && (
            <Cropper src={imageUrl} ref={cropperRef} style={{ height:240,width:'100%',borderRadius:'10px' }} aspectRatio={1} guides={false} crop={generatePreview}/>
          )}
          {previewUrl && (
            <div style={{ display:'flex',alignItems:'center',gap:'12px' }}>
              <img src={previewUrl} alt="Preview" style={{ width:56,height:56,borderRadius:'50%',objectFit:'cover',border:'2px solid var(--border)' }}/>
              <span style={{ color:'var(--muted)',fontSize:'0.85rem' }}>Preview of cropped photo</span>
            </div>
          )}
          <button type="submit" disabled={!file||uploading} style={{ padding:'13px',borderRadius:'10px',background:!file||uploading?'var(--muted)':'var(--crimson)',color:'white',border:'none',cursor:!file||uploading?'not-allowed':'pointer',fontFamily:'DM Sans, sans-serif',fontWeight:700,fontSize:'0.95rem',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
            <Upload size={16}/> {uploading?'Uploading…':'Save Photo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
