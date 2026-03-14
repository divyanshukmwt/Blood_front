import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { receiveMessage, sendMessage } from "../config/Socket";
import { toast } from 'react-toastify';
import moment from 'moment';

const timecalculator = (time) => {
  if (time == 60) return "60s";
  if (time == 120) return "2 min";
  if (time == 300) return "5 min";
  if (time == 600) return "10 min";
  if (time == 1800) return "30 min";
  if (time == 3600) return "1 hr";
  return "—";
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
    const { bloodGroup, number, urgency } = data;
    sendMessage("blood-request", { bloodGroup, number, date, Time, urgency });
    reset();
    setModalOpen(false);
    setReqComing(false);
    toast.success("Blood request posted!");
  };

  useEffect(() => {
    setDate(moment().format("DD/MM/YYYY"));
    setTime(moment().format("hh:mm A"));
    receiveMessage("delayTime", (data) => setDelayTimer(timecalculator(data)));
  }, []);

  useEffect(() => {
    if (modalOpen && date && Time) {
      sendMessage("seeAllowRequest", { date, Time });
    }
  }, [modalOpen, date, Time]);

  useEffect(() => {
    receiveMessage("allowingResult", (data) => {
      setAllow(data.result);
      setReqComing(true);
      if (!data.result) setNextTime(`${data.hours}:${data.minutes}`);
    });
  }, []);

  const inputStyle = (hasError) => ({
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: `1.5px solid ${hasError ? 'var(--crimson)' : 'var(--border)'}`,
    background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.2s',
  });

  return (
    <>
      {/* Card */}
      <div style={{
        background: 'white', borderRadius: '20px', padding: '28px 32px',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px',
        boxShadow: 'var(--card-shadow)',
      }}>
        <div>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Need blood?</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
            Post a request • Cooldown: <span style={{ color: 'var(--crimson)', fontWeight: 700 }}>{Delaytimer}</span>
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} style={{
          padding: '12px 24px', borderRadius: '10px',
          background: 'var(--crimson)', color: 'white',
          border: 'none', cursor: 'pointer',
          fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '8px',
          transition: 'all 0.2s',
          boxShadow: '0 2px 12px rgba(192,21,42,0.3)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.transform = 'none'; }}
        >
          🩸 Post Request
        </button>
      </div>

      {/* Modal overlay */}
      {modalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(15,13,12,0.6)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
          animation: 'fade-in 0.2s ease',
        }} onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div style={{
            background: 'white', borderRadius: '24px',
            padding: '40px', width: '100%', maxWidth: '460px',
            boxShadow: '0 24px 80px rgba(15,13,12,0.25)',
            animation: 'fade-up 0.3s cubic-bezier(0.22,1,0.36,1) both',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>New Blood Request</h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '2px' }}>Fill in the details below</p>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ash)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {!reqComing ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid var(--crimson)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Checking eligibility…</p>
              </div>
            ) : allow ? (
              <form onSubmit={handleSubmit(submitForm)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '8px', textTransform: 'uppercase' }}>Blood Group</label>
                  <select {...register("bloodGroup", { required: true, validate: v => v !== "default" || "Select a blood group" })} defaultValue="default" style={inputStyle(errors.bloodGroup)}>
                    <option value="default" disabled>Select blood group</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                  {errors.bloodGroup && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>Please select a blood group</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '8px', textTransform: 'uppercase' }}>Contact Number</label>
                  <input type="number" placeholder="10-digit phone number" {...register("number", { required: true, minLength: 10, maxLength: 10 })} maxLength={10} style={inputStyle(errors.number)} />
                  {errors.number && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>Valid 10-digit number required</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', marginBottom: '8px', textTransform: 'uppercase' }}>Urgency Level</label>
                  <select {...register("urgency", { required: true, validate: v => v !== "default" || "Select urgency" })} defaultValue="default" style={inputStyle(errors.urgency)}>
                    <option value="default" disabled>Select urgency</option>
                    <option value="high">🔴 High — Critical</option>
                    <option value="Medium">🟡 Medium — Moderate</option>
                    <option value="Low">🟢 Low — Non-urgent</option>
                  </select>
                  {errors.urgency && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '4px' }}>Please select urgency</p>}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', padding: '4px 0' }}>
                  By confirming, you agree to our terms and conditions.
                </p>
                <button type="submit" style={{
                  padding: '14px', borderRadius: '10px',
                  background: 'var(--crimson)', color: 'white', border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.95rem',
                }}>Confirm Request →</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.15rem', marginBottom: '8px' }}>Please wait</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>You can post your next request in</p>
                <p style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.75rem', color: 'var(--crimson)', marginTop: '8px' }}>{NextTime}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default AddRequest;
