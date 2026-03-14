import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";

const Form = ({ fn }) => {
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await Axios.post("/users/alldets", data);
      setUser(res.data);
      fn(false);
      toast.success("👏 Profile updated!");
    } catch {
      toast.error("❌ Something went wrong!");
    }
  };

  const inputStyle = {
    width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(255,255,255,0.12)",
    borderRadius:"10px", outline:"none", color:"#fff", fontSize:"14px", fontFamily:"Poppins,sans-serif", transition:"all 200ms ease",
  };

  const labelStyle = {
    display:"block", fontSize:"11px", fontWeight:600, color:"rgba(255,255,255,0.5)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"5px",
  };

  const focusStyle = (e) => { e.target.style.borderColor = "var(--crimson)"; e.target.style.boxShadow = "0 0 0 3px rgba(192,21,42,0.2)"; };
  const blurStyle = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(13,13,13,0.8)", backdropFilter:"blur(12px)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ background:"#1a1a1a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"24px", padding:"32px", width:"100%", maxWidth:"620px", maxHeight:"90vh", overflowY:"auto", animation:"rh-slide-up 0.25s ease" }}>
        <div style={{ marginBottom:"24px" }}>
          <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"24px", fontWeight:700, color:"#fff", margin:0 }}>Complete Your Profile</h3>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px", marginTop:"6px" }}>We need a few more details to get you started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input {...register("number", { required: "Required", minLength:{value:10,message:"10 digits"}, maxLength:{value:10,message:"10 digits"} })}
                style={inputStyle} type="number" placeholder="10-digit number" onFocus={focusStyle} onBlur={blurStyle}/>
              {errors.number && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.number.message}</p>}
            </div>

            {/* Emergency contact */}
            <div>
              <label style={labelStyle}>Emergency Contact</label>
              <input {...register("emargencyNumber", { required: "Required", minLength:{value:10,message:"10 digits"}, maxLength:{value:10,message:"10 digits"} })}
                style={inputStyle} type="number" placeholder="Emergency number" onFocus={focusStyle} onBlur={blurStyle}/>
              {errors.emargencyNumber && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.emargencyNumber.message}</p>}
            </div>

            {/* DOB */}
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input {...register("dob", { required:"Required", validate: v => { const d=new Date(v); return (d>=new Date("1960-01-01") && d<=new Date()) || "Invalid date"; } })}
                style={inputStyle} type="date" onFocus={focusStyle} onBlur={blurStyle}/>
              {errors.dob && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.dob.message}</p>}
            </div>

            {/* Weight */}
            <div>
              <label style={labelStyle}>Weight (kg)</label>
              <input {...register("weight", { required:"Required", min:{value:30,message:"Min 30 kg"}, max:{value:200,message:"Max 200 kg"} })}
                style={inputStyle} type="number" placeholder="e.g. 65" onFocus={focusStyle} onBlur={blurStyle}/>
              {errors.weight && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.weight.message}</p>}
            </div>

            {/* Height */}
            <div>
              <label style={labelStyle}>Height (cm)</label>
              <input {...register("height", { required:"Required", min:{value:90,message:"Min 90 cm"}, max:{value:250,message:"Max 250 cm"} })}
                style={inputStyle} type="number" placeholder="e.g. 170" onFocus={focusStyle} onBlur={blurStyle}/>
              {errors.height && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.height.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label style={labelStyle}>Address</label>
              <input {...register("address", { required:"Required", minLength:{value:5,message:"Min 5 chars"}, maxLength:{value:30,message:"Max 30 chars"}, pattern:{value:/^(?!\d+$)[a-zA-Z0-9\s]+$/,message:"Invalid address"} })}
                style={inputStyle} type="text" placeholder="Your address" onFocus={focusStyle} onBlur={blurStyle}/>
              {errors.address && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.address.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <label style={labelStyle}>Gender</label>
              <select {...register("gender", { required:"Required", validate: v => v!=="default"||"Select gender" })}
                style={{ ...inputStyle, backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center", cursor:"pointer" }}
                onFocus={focusStyle} onBlur={blurStyle}>
                <option value="default" style={{background:"#1a1a1a"}}>Select gender</option>
                <option value="Male" style={{background:"#1a1a1a"}}>Male</option>
                <option value="Female" style={{background:"#1a1a1a"}}>Female</option>
                <option value="Transgender" style={{background:"#1a1a1a"}}>Transgender</option>
              </select>
              {errors.gender && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.gender.message}</p>}
            </div>

            {/* Blood group */}
            <div>
              <label style={labelStyle}>Blood Group</label>
              <select {...register("bloodGroup", { required:"Required", validate: v => v!=="default"||"Select blood group" })}
                style={{ ...inputStyle, backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat:"no-repeat", backgroundPosition:"right 10px center", cursor:"pointer" }}
                onFocus={focusStyle} onBlur={blurStyle}>
                <option value="default" style={{background:"#1a1a1a"}}>Select blood group</option>
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => <option key={g} value={g} style={{background:"#1a1a1a"}}>{g}</option>)}
              </select>
              {errors.bloodGroup && <p style={{ color:"var(--crimson)", fontSize:"11px", marginTop:"4px" }}>{errors.bloodGroup.message}</p>}
            </div>
          </div>

          <button type="submit" className="rh-btn rh-btn-primary rh-btn-lg" style={{ width:"100%", marginTop:"8px" }}>
            Save Profile →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
