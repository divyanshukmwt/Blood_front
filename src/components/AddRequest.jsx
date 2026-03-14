import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { receiveMessage, sendMessage } from "../config/Socket";
import { toast } from 'react-toastify';
import moment from 'moment';
import { Plus, X, Clock, CheckCircle } from 'lucide-react';

const DELAY_LABELS = { 60: '60s', 120: '2 min', 300: '5 min', 600: '10 min', 1800: '30 min', 3600: '1 hr' };

const AddRequest = ({ time }) => {
  const [showModal, setShowModal] = useState(false);
  const [DelayTimer, setDelayTimer] = useState(DELAY_LABELS[time] || '');
  const [Time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [allow, setAllow] = useState(true);
  const [NextTime, setNextTime] = useState('');
  const [reqComing, setReqComing] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submitFrom = (data) => {
    const { bloodGroup, number, urgency } = data;
    sendMessage("blood-request", { bloodGroup, number, date, Time, urgency });
    reset(); setShowModal(false); setReqComing(false);
    toast.success("Blood request submitted!");
  };

  useEffect(() => {
    setDate(moment().format("DD/MM/YYYY"));
    setTime(moment().format("hh:mm A"));
    receiveMessage("delayTime", d => setDelayTimer(DELAY_LABELS[d]));
  }, []);

  useEffect(() => { if (showModal && date && Time) sendMessage("seeAllowRequest", { date, Time }); }, [showModal, date, Time]);

  useEffect(() => {
    receiveMessage("allowingResult", data => {
      setAllow(data.result); setReqComing(true);
      if (!data.result) setNextTime(`${data.hours}:${data.minutes}`);
    });
  }, []);

  return (
    <>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px 28px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', boxShadow: 'var(--card-shadow)' }}>
        <div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>Need Blood?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} /> Delay timer: <strong style={{ color: 'var(--crimson)' }}>{DelayTimer || '—'}</strong>
          </p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '12px 24px', borderRadius: '10px', background: 'var(--crimson)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s', whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(192,21,42,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.transform = 'none'; }}
        >
          <Plus size={16} /> New Request
        </button>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,13,12,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fade-in 0.2s ease' }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '440px', animation: 'fade-up 0.3s cubic-bezier(0.22,1,0.36,1)', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', width: 32, height: 32, borderRadius: '50%', background: 'var(--ash)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
              <X size={14} />
            </button>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>New Blood Request</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '28px' }}>Fill in the details to submit your request.</p>

            {!reqComing ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--muted)', fontSize: '0.9rem' }}>

                <Clock
                  size={24}
                  style={{ margin: '0 auto 8px', color: 'var(--muted)', display: 'block' }}
                />

                <p style={{ marginBottom: '6px' }}>
                  Preparing your form…
                </p>

                <p style={{
                  fontSize: '0.75rem',
                  opacity: 0.7,
                  fontStyle: 'italic'
                }}>
                  If this takes too long, please refresh the page.
                </p>

              </div>
            ) : !allow ? (
              <div style={{ textAlign: 'center', padding: '24px', background: 'var(--crimson-pale)', borderRadius: '12px', border: '1px solid rgba(192,21,42,0.2)' }}>
                <Clock size={28} style={{ color: 'var(--crimson)', margin: '0 auto 12px', display: 'block' }} />
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--crimson)', fontSize: '1rem' }}>Wait {NextTime} before your next request</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(submitFrom)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>BLOOD GROUP</label>
                  <select {...register("bloodGroup", { required: true, validate: v => v !== "default" })} defaultValue="default"
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: `1.5px solid ${errors.bloodGroup ? 'var(--crimson)' : 'var(--border)'}`, background: 'var(--ash)', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
                    <option value="default" disabled>Select blood group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>PHONE NUMBER</label>
                  <input type="number" placeholder="10-digit mobile number" {...register("number", { required: true, minLength: 10, maxLength: 10 })} maxLength={10}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: `1.5px solid ${errors.number ? 'var(--crimson)' : 'var(--border)'}`, background: 'var(--ash)', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>URGENCY LEVEL</label>
                  <select {...register("urgency", { required: true, validate: v => v !== "default" })} defaultValue="default"
                    style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: `1.5px solid ${errors.urgency ? 'var(--crimson)' : 'var(--border)'}`, background: 'var(--ash)', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
                    <option value="default" disabled>Select urgency</option>
                    <option value="high">High — Immediate</option>
                    <option value="Medium">Medium — Within hours</option>
                    <option value="Low">Low — Scheduled</option>
                  </select>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>By submitting, you agree to our terms. We'll notify matching donors immediately.</p>
                <button type="submit" style={{ padding: '13px', borderRadius: '10px', background: 'var(--crimson)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 2px 12px rgba(192,21,42,0.35)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <CheckCircle size={16} /> Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddRequest;
