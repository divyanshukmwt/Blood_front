import { useContext } from 'react';
import Navbar from '../utils/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import { toast } from 'react-toastify';
import Axios from "../config/Axois";
import AbandonWord from "../utils/AbandonWord";

const ContactUs = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    reset();
    const res = await Axios.post("/users/contactUs", { name: user.name, email: user.email, message: data.message });
    if (res.status === 200) {
      toast.success("Message sent successfully!");
      navigate("/users/profile");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <Navbar field={[
        { link: "/users/profile", name: "Profile" },
        { link: "/", name: "Home" },
        { link: "/donate/request-list", name: "Donate" },
        { link: "/reciver/blood", name: "Blood" },
        { link: "/about", name: "About" },
      ]} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '96px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'start' }} className="contact-grid">
          {/* Left */}
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '12px' }}>CONTACT</p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.1 }}>
              We'd love<br/>to hear you
            </h1>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '40px' }}>
              Have a question, feedback, or issue? Drop us a message and we'll get back to you as soon as possible.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '📧', title: 'Email us', val: 'codxdot@gmail.com' },
                { icon: '⏱️', title: 'Response time', val: 'Within 24 hours' },
                { icon: '🇮🇳', title: 'Based in', val: 'India' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'var(--ash)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>{item.title}</div>
                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--ash)', borderRadius: '24px', padding: '40px' }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>YOUR NAME</label>
                <input
                  {...register("name")}
                  value={user?.name || ''} readOnly
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: '1.5px solid var(--border)',
                    background: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', outline: 'none',
                    fontFamily: 'DM Sans, sans-serif', color: 'var(--muted)',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>EMAIL</label>
                <input
                  {...register("email")}
                  value={user?.email || ''} readOnly type="email"
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: '1.5px solid var(--border)',
                    background: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', outline: 'none',
                    fontFamily: 'DM Sans, sans-serif', color: 'var(--muted)',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>MESSAGE</label>
                <textarea
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                    validate: (value) => {
                      const lowerValue = value.toLowerCase();
                      return !AbandonWord.some(bad => lowerValue.includes(bad)) || "Message contains restricted words!";
                    },
                  })}
                  placeholder="How can we help you?"
                  rows={5}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: `1.5px solid ${errors.message ? 'var(--crimson)' : 'var(--border)'}`,
                    background: 'white', fontSize: '0.95rem', outline: 'none',
                    fontFamily: 'DM Sans, sans-serif', resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                  onBlur={e => e.target.style.borderColor = errors.message ? 'var(--crimson)' : 'var(--border)'}
                />
                {errors.message && <p style={{ color: 'var(--crimson)', fontSize: '0.78rem', marginTop: '5px' }}>{errors.message.message}</p>}
              </div>
              <button
                onClick={e => { e.preventDefault(); handleSubmit(onSubmit)(); }}
                type="submit"
                style={{
                  padding: '14px', borderRadius: '10px',
                  background: 'var(--crimson)', color: 'white',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
              >
                Send message →
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <style>{`
        @media (max-width: 767px) { .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </div>
  );
};

export default ContactUs;
