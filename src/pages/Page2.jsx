import React, { useRef, useEffect } from 'react';
import page2 from "../../public/page2.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.from(imageRef.current, {
      x: -100, // from left
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(textRef.current, {
      x: 100, // from right
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="w-full h-screen bg-white relative flex items-center justify-center">
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-12">

        {/* Image */}
        <div ref={imageRef} className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full h-[40vh] lg:h-[80vh] bg-cover bg-center rounded-xl shadow-lg">
            <img
              className="w-full h-full object-[0%_100%] object-cover"
              src={page2}
              alt=""
            />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center gap-6 text-center lg:text-left">
          <div className="text-4xl lg:text-5xl font-bold text-red-600">
            <h2 className="font-[oswald]">We Believe We Can Save More Lives</h2>
          </div>
          <div className="text-gray-700 text-l lg:text-xl leading-relaxed">
            <p className="font-[inter]">
              Every drop of blood has the power to give someone a second chance. At RedHope, we connect caring donors with patients in urgent need, turning simple acts of kindness into life-saving miracles. By making blood donation easy, safe, and accessible, we aim to bring hope to families, strength to hospitals, and life to those who need it most. Together, we’re not just donating blood we’re giving hope, spreading love, and saving lives.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Page2;
