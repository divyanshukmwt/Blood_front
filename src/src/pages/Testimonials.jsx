import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  { id: 1, name: "Ananya Sharma", role: "Regular Donor", review: "Donating blood through RedHope was seamless and fulfilling. The platform made it so easy to find a recipient. I feel proud to save lives!", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "Rahul Verma", role: "Blood Recipient", review: "The platform helped us find a donor within minutes during an emergency. I can't thank RedHope enough — it literally saved my father's life.", image: "https://randomuser.me/api/portraits/men/35.jpg" },
  { id: 3, name: "Priya Singh", role: "Volunteer Donor", review: "A wonderful initiative! RedHope truly saves lives and spreads hope across communities. The process is smooth and trustworthy.", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 4, name: "Vikram Mehta", role: "Regular Donor", review: "Quick, reliable, and life-saving. RedHope is changing the way we think about blood donation. I've donated 4 times through this platform.", image: "https://randomuser.me/api/portraits/men/50.jpg" },
  { id: 5, name: "Sonal Kapoor", role: "First-Time Donor", review: "This platform helped me donate blood safely and efficiently on my very first try. The guidance and support was excellent throughout.", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 6, name: "Amit Singh", role: "Blood Recipient", review: "RedHope made it easy to connect with a donor in a critical moment. Every donation truly counts — this platform proves it.", image: "https://randomuser.me/api/portraits/men/12.jpg" },
];

const StarRating = () => (
  <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--crimson)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section style={{ background: "var(--ink-2)", padding: "96px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--crimson-muted)", borderRadius: "99px", padding: "6px 16px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--crimson)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Testimonials</span>
          </div>
          <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
            What People Say About Us
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink-40)", marginTop: "12px", lineHeight: 1.7 }}>
            Real stories from donors, recipients, and community members
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: "48px" }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div style={{ background: "#fff", border: "1px solid var(--ink-10)", borderRadius: "20px", padding: "28px", height: "100%", display: "flex", flexDirection: "column", gap: "0", boxShadow: "var(--shadow-sm)", transition: "all 200ms ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <StarRating/>
                <p style={{ fontSize: "14px", color: "var(--ink-60)", lineHeight: 1.75, margin: "0 0 20px", flex: 1, fontStyle: "italic" }}>
                  "{t.review}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid var(--ink-10)" }}>
                  <img src={t.image} alt={t.name} style={{ width: 44, height: 44, borderRadius: "12px", objectFit: "cover", border: "2px solid var(--crimson-muted)" }}/>
                  <div>
                    <p style={{ fontFamily: "oswald,sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--crimson)", fontWeight: 600, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`.swiper-pagination-bullet-active { background: var(--crimson) !important; } .swiper-pagination-bullet { background: var(--ink-20); }`}</style>
    </section>
  );
};

export default Testimonials;
