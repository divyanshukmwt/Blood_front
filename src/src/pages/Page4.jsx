import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import card1 from "../../public/card1.webp";
import card2 from "../../public/card2.webp";
import card3 from "../../public/card3.webp";
import card4 from "../../public/card4.webp";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  { title: "Real-Time Requests", subtitle: "Donors see live blood requests and respond directly to those in need.", image: card1, icon: "⚡" },
  { title: "Trusted Community", subtitle: "Safe and verified donors and receivers for secure, trusted interactions.", image: card2, icon: "🛡️" },
  { title: "Location Matching", subtitle: "Instantly find compatible donors and receivers in your area.", image: card3, icon: "📍" },
  { title: "Life-Saving Impact", subtitle: "Every donation helps save a life. Track your positive impact.", image: card4, icon: "💓" },
];

const Page4 = () => {
  const cardsRef = useRef([]);
  cardsRef.current = [];

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        y: 50, opacity: 0, duration: 0.8, delay: i * 0.12, ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
      });
    });
  }, []);

  return (
    <section style={{ background: "var(--ink-2)", padding: "96px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--crimson-muted)", borderRadius: "99px", padding: "6px 16px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Why RedHope</span>
          </div>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            Turning Kindness into Action
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink-40)", marginTop: "12px", maxWidth: "520px", margin: "12px auto 0", lineHeight: 1.7 }}>
            Every feature of RedHope is designed to connect the right people at the right time.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="cards-grid">
          {cardsData.map((card, index) => (
            <div
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--ink-10)", boxShadow: "var(--shadow-sm)", transition: "all 300ms ease", cursor: "default" }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                e.currentTarget.style.borderColor = "var(--ink-10)";
              }}
            >
              {/* Image */}
              <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 400ms ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", top: "14px", left: "14px", width: "36px", height: "36px", background: "rgba(255,255,255,0.92)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", backdropFilter: "blur(6px)" }}>
                  {card.icon}
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontFamily: "oswald,sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "0.01em" }}>{card.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--ink-60)", lineHeight: 1.65, margin: 0 }}>{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .cards-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:480px){ .cards-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Page4;
