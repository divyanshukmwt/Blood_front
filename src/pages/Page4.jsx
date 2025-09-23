import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import card1 from "../../public/card1.png";
import card2 from "../../public/card2.png";
import card3 from "../../public/card3.jpg";
import card4 from "../../public/card4.png";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    title: "Real-Time Requests",
    subtitle: "Donors see blood requests, enabling direct donor's response.",
    image: card1,
  },
  {
    title: "Trusted Community",
    subtitle: "Safe and verified donors and receivers for secure interactions.",
    image: card2,
  },
  {
    title: "Location-Based Matching",
    subtitle: "Easily find donors and receivers nearby using accurate locations.",
    image: card3,
  },
  {
    title: "Life-Saving Impact",
    subtitle: "Your donation can help save lives and make a real difference.",
    image: card4,
  },
];

const Page4 = () => {
  const cardsRef = useRef([]);
  const overlaysRef = useRef([]);
  const textRef = useRef([]);

  cardsRef.current = [];
  overlaysRef.current = [];
  textRef.current = [];

  const addToRefs = (el, overlayEl, textEl) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
    if (overlayEl && !overlaysRef.current.includes(overlayEl)) overlaysRef.current.push(overlayEl);
    if (textEl && !textRef.current.includes(textEl)) textRef.current.push(textEl);
  };

  useEffect(() => {
    // Animate cards sliding up on scroll
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    // Hover animations
    cardsRef.current.forEach((card, i) => {
      const overlay = overlaysRef.current[i];
      const text = textRef.current[i];

      // Ensure initial state is fully transparent and text hidden
      gsap.set(overlay, { backgroundColor: "rgba(255,0,0,0)" });
      gsap.set(text, { opacity: 0, y: 20 });

      card.addEventListener("mouseenter", () => {
        gsap.to(overlay, { backgroundColor: "rgba(255,0,0,0.6)", duration: 0.5 });
        gsap.to(text, { opacity: 1, y: 0, duration: 0.5 });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(overlay, { backgroundColor: "rgba(255,0,0,0)", duration: 0.5 });
        gsap.to(text, { opacity: 0, y: 20, duration: 0.5 });
      });
    });
  }, []);

  return (
<div className="w-full bg-[#ffefef] py-24 px-6 lg:px-24 flex flex-col items-center gap-12">
  
  {/* Section Heading */}
  <h2 className="text-4xl lg:text-5xl font-[oswald] font-bold text-red-600 text-center">
    Turning Kindness into Action
  </h2>

  {/* Cards Container */}
  <div className="w-full flex flex-wrap justify-center gap-8">
    {cardsData.map((card, index) => (
      <div
        key={index}
        ref={(el) => addToRefs(el, overlaysRef.current[index], textRef.current[index])}
        className="relative w-full sm:w-[45%] lg:w-[22%] h-80 rounded-xl overflow-hidden cursor-pointer shadow-xl"
      >
        {/* Image */}
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div
          ref={(el) => (overlaysRef.current[index] = el)}
          className="absolute inset-0 pointer-events-none"
        ></div>

        {/* Text */}
        <div
          ref={(el) => (textRef.current[index] = el)}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        >
          <h3 className="text-white text-2xl font-[oswald] font-bold">{card.title}</h3>
          <p className="text-white font-[inter] mt-2">{card.subtitle}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Page4;
