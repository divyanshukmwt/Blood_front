import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const images = [
  "https://img.freepik.com/premium-photo/smiling-young-woman-donating-blood-blood-drive-she-is-looking-blood-bag-smiling-nurse-is-taking-her-blood-pressure_1209158-36479.jpg",
  "https://media.istockphoto.com/id/1307735167/photo/young-male-donor-donating-blood.jpg?s=612x612&w=0&k=20&c=BMq1nFRuA8tgDTWA6xkVwUGavTdeejHxgcQxJekKTCo=",
  "https://media.istockphoto.com/id/2222001819/photo/young-adult-black-man-donating-blood-while-smiling-in-medical-facility.jpg?s=612x612&w=0&k=20&c=cbW2uFpKcXVP75Ex5rar7kWWyW7z5k8dOL--DDsH7MI=",
  "https://media.istockphoto.com/id/521848481/photo/nice-hospital-phlebotomist-taking-a-sample-from-a-patient.jpg?s=612x612&w=0&k=20&c=C2jaxeEqvTWmMAQ99T_a_k224wksTbbfCHuVW4HGQYE=",
  "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/27945/a-blood-donor-holding-her-donation.png",
  "https://www.shutterstock.com/image-photo/attractive-young-woman-lying-down-600nw-2330282875.jpg",
  "https://insights.ibx.com/wp-content/uploads/2021/06/donate-blood-masks.jpg",
  "https://static.timesnewsgroup.com.au/prod/uploads/sites/29/2025/01/RedCrossLifebloodpho_86187.jpg",
];

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const totalWidth = marquee.scrollWidth / 2;
    gsap.to(marquee, {
      x: `-=${totalWidth}`,
      ease: "linear",
      duration: 25,
      repeat: -1,
      modifiers: { x: (x) => `${parseFloat(x) % totalWidth}px` },
    });
  }, []);

  return (
    <section style={{ background: "var(--ink-2)", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "40px", padding: "0 32px" }}>
        <h2 style={{ fontFamily: "oswald,sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "var(--ink)", margin: "0 0 10px" }}>
          Be the Reason for <span style={{ color: "var(--crimson)" }}>Smiles</span>
        </h2>
        <p style={{ fontSize: "15px", color: "var(--ink-40)", margin: 0 }}>Real moments of life-saving kindness from our community</p>
      </div>

      <div style={{ overflow: "hidden", width: "100%" }}>
        <div ref={marqueeRef} style={{ display: "flex", width: "max-content", gap: "16px", padding: "0 8px" }}>
          {images.concat(images).map((img, idx) => (
            <div key={idx} style={{ width: "280px", height: "200px", borderRadius: "16px", overflow: "hidden", flexShrink: 0, border: "1px solid var(--ink-10)", boxShadow: "var(--shadow-sm)" }}>
              <img src={img} alt={`donation-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px", padding: "0 32px" }}>
        <p style={{ fontSize: "16px", color: "var(--ink-60)", fontStyle: "italic" }}>
          "Be a donor, be a life-saver, be a hero"
        </p>
      </div>
    </section>
  );
};

export default Marquee;
