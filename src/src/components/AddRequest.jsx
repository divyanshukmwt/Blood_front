import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { receiveMessage, sendMessage } from "../config/Socket";
import { toast } from 'react-toastify';
import moment from 'moment';

const timecalculator = (time) => {
  if (time == 60) return "60 sec";
  if (time == 120) return "2 min";
  if (time == 300) return "5 min";
  if (time == 600) return "10 min";
  if (time == 1800) return "30 min";
  if (time == 3600) return "1 hour";
  return time ? `${time}s` : "—";
};

const AddRequest = ({ time }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [Delaytimer, setDelayTimer] = useState(timecalculator(time));
  const [Time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [allow, setAllow] = useState(true);
  const [NextTime, setNextTime] = useState("");
  const [reqComing, setReqComing] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submitForm = (data) => {
    try {
      const { bloodGroup, number, urgency } = data;
      sendMessage("blood-request", { bloodGroup, number, date, Time, urgency });
      reset();
      setModalOpen(false);
      setReqComing(false);
      toast.success("🎉 Request added successfully!");
    } catch (err) {
      toast.error("❌ Something went wrong!");
    }
  };

  useEffect(() => {
    if (modalOpen && date && Time) {
      sendMessage("seeAllowRequest", { date, Time });
    }
  }, [modalOpen, date, Time]);

  useEffect(() => {
    const localTime = moment().format("hh:mm A");
    const localDate = moment().format("DD/MM/YYYY");
    setDate(localDate);
    setTime(localTime);
    receiveMessage("delayTime", (data) => setDelayTimer(timecalculator(data)));
  }, []);

  useEffect(() => {
    receiveMessage("allowingResult", (data) => {
      setAllow(data.result);
      setReqComing(true);
      if (!data.result) setNextTime(`${data.hours}:${data.minutes}`);
    });
  }, []);

  return (
    <>
      <div style={{
        background:"#fff",
        border:"1px solid var(--ink-10)",
        borderRadius:"16px",
        padding:"20px 24px",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        gap:"16px",
        flexWrap:"wrap",
        boxShadow:"var(--shadow-sm)",
      }}>
        <div>
          <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"20px", fontWeight:700, color:"var(--ink)", margin:0 }}>Request Blood</h3>
          <p style={{ fontSize:"13px", color:"var(--ink-40)", margin:"4px 0 0" }}>
            Delay between requests: <strong style={{ color:"var(--ink-60)" }}>{Delaytimer}</strong>
          </p>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px", background:"var(--info-bg)", borderRadius:"8px", padding:"8px 12px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontSize:"13px", color:"var(--info)", fontWeight:500 }}>{date} · {Time}</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="rh-btn rh-btn-primary rh-btn-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Request
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="rh-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="rh-modal" style={{ padding:"32px" }}>
            {/* Modal header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px" }}>
              <div>
                <h3 style={{ fontFamily:"oswald,sans-serif", fontSize:"24px", fontWeight:700, color:"var(--ink)", margin:0 }}>New Blood Request</h3>
                <p style={{ fontSize:"13px", color:"var(--ink-40)", margin:"4px 0 0" }}>{date} at {Time}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ width:32, height:32, borderRadius:"8px", background:"var(--ink-5)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--ink-60)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {!reqComing ? (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div className="rh-spinner" style={{ margin:"0 auto 16px" }}/>
                <p style={{ color:"var(--ink-40)", fontSize:"14px" }}>Checking availability...</p>
              </div>
            ) : allow ? (
              <form onSubmit={handleSubmit(submitForm)} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                <div className="rh-field">
                  <label className="rh-label">Blood Group Required</label>
                  <select
                    {...register("bloodGroup", {
                      required: "Please select a blood group",
                      validate: v => v !== "default" || "Please select a valid blood group",
                    })}
                    className="rh-select"
                  >
                    <option value="default">Select blood group</option>
                    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.bloodGroup && <p className="rh-error">{errors.bloodGroup.message}</p>}
                </div>

                <div className="rh-field">
                  <label className="rh-label">Contact Number</label>
                  <input
                    type="number"
                    placeholder="10-digit mobile number"
                    {...register("number", { required: true, minLength: 10, maxLength: 10 })}
                    maxLength={10}
                    className="rh-input"
                    style={{ letterSpacing:"0.1em" }}
                  />
                  {errors.number && <p className="rh-error">Number must be exactly 10 digits</p>}
                </div>

                <div className="rh-field">
                  <label className="rh-label">Urgency Level</label>
                  <select
                    {...register("urgency", {
                      required: "Please select the urgency level",
                      validate: v => v !== "default" || "Please select the urgency level",
                    })}
                    className="rh-select"
                  >
                    <option value="default">Select urgency</option>
                    <option value="high">🔴 High — Immediate</option>
                    <option value="Medium">🟡 Medium — Within hours</option>
                    <option value="Low">🟢 Low — Scheduled</option>
                  </select>
                  {errors.urgency && <p className="rh-error">{errors.urgency.message}</p>}
                </div>

                <div style={{ background:"var(--warning-bg)", border:"1px solid rgba(196,122,0,0.2)", borderRadius:"10px", padding:"12px 14px", marginTop:"4px" }}>
                  <p style={{ fontSize:"12px", color:"var(--warning)", margin:0, lineHeight:1.6 }}>
                    ⚠️ By clicking Confirm, you agree to our terms. We'll notify you when a donor is found.
                  </p>
                </div>

                <button type="submit" className="rh-btn rh-btn-primary rh-btn-lg" style={{ width:"100%", marginTop:"4px" }}>
                  Confirm Request
                </button>
              </form>
            ) : (
              <div style={{ textAlign:"center", padding:"32px 0" }}>
                <div style={{ fontSize:"48px", marginBottom:"16px" }}>⏳</div>
                <h4 style={{ fontFamily:"oswald,sans-serif", fontSize:"20px", color:"var(--ink)", margin:"0 0 8px" }}>Please Wait</h4>
                <p style={{ color:"var(--ink-40)", fontSize:"15px" }}>
                  Next request available in <strong style={{ color:"var(--crimson)" }}>{NextTime}</strong> minutes
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddRequest;
