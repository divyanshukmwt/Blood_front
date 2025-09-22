import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page3 = () => {
  const counterRefs = useRef([]);
  counterRefs.current = [];

  const addToRefs = (el) => {
    if (el && !counterRefs.current.includes(el)) {
      counterRefs.current.push(el);
    }
  };

  useEffect(() => {
    counterRefs.current.forEach((el) => {
      const endValue = parseInt(el.dataset.value); // final number
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 1,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const stats = [
    { label: "Donors", value: 1250 },
    { label: "Blood Units Donated", value: 3500 },
    { label: "Lives Saved", value: 870 },
    { label: "Active Donor Locations", value: 120 },
  ];

  return (
    <div className="w-full bg-white py-20 flex flex-col md:flex-row justify-around items-center gap-y-10 md:gap-y-0">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <p
            ref={addToRefs}
            data-value={stat.value}
            className="text-4xl md:text-5xl font-bold font-[oswald] text-red-600"
          >
            0
          </p>
          <p className="text-xl md:text-2xl font-[oswald] text-gray-700 mt-2">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Page3;
