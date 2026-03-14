import React from 'react';
import { useForm } from "react-hook-form";
import AdminAxios from "../config/AdminAxios";
import { toast } from 'react-toastify';

const TicketForm = ({ vari, fn }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (!vari) return null;

  const onSubmit = async (data) => {
    try {
      await AdminAxios.post("/admin/ticket-maker", {
        ticketTitle: data.ticketTitle,
        description: data.description,
      });
      fn(false);
      reset();
      toast.success("Ticket raised successfully!");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15,13,12,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', animation: 'fade-in 0.2s ease',
    }} onClick={e => { if (e.target === e.currentTarget) fn(false); }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '40px',
        width: '100%', maxWidth: '460px',
        animation: 'fade-up 0.3s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
      }}>
        <button onClick={() => fn(false)} style={{
          position: 'absolute', top: '20px', right: '20px',
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--ash)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🎫</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Raise a Ticket
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '28px' }}>
          Describe the issue or update you'd like to communicate.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>TICKET TITLE</label>
            <input
              {...register("ticketTitle", {
                required: "Title is required",
                minLength: { value: 3, message: "Min 3 characters" },
                maxLength: { value: 20, message: "Max 20 characters" },
              })}
              type="text" placeholder="Brief summary…"
              style={{
                width: '100%', padding: '11px 16px', borderRadius: '10px',
                border: `1.5px solid ${errors.ticketTitle ? 'var(--crimson)' : 'var(--border)'}`,
                background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.ticketTitle ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.ticketTitle && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.ticketTitle.message}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>DESCRIPTION</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Min 10 characters" },
                maxLength: { value: 250, message: "Max 250 characters" },
              })}
              placeholder="Describe the issue in detail…"
              rows={5}
              style={{
                width: '100%', padding: '11px 16px', borderRadius: '10px',
                border: `1.5px solid ${errors.description ? 'var(--crimson)' : 'var(--border)'}`,
                background: 'var(--ash)', fontSize: '0.95rem', outline: 'none',
                fontFamily: 'DM Sans, sans-serif', resize: 'vertical',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
              onBlur={e => e.target.style.borderColor = errors.description ? 'var(--crimson)' : 'var(--border)'}
            />
            {errors.description && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.description.message}</p>}
          </div>

          <button type="submit" style={{
            padding: '13px', borderRadius: '10px',
            background: 'var(--crimson)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
            transition: 'all 0.2s',
            boxShadow: '0 2px 12px rgba(192,21,42,0.3)',
          }}>
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
