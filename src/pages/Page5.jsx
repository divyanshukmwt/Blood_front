"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Sign Up / Login",
    description: "Create an account or log in to join our lifesaving community. Your profile helps us connect you with requests quickly."
  },
  {
    id: 2,
    title: "Add a Blood Request / Donate Blood",
    description: "If you or someone you know needs blood, submit a request or choose to donate blood, specifying necessary details like blood group, and location."
  },
  {
    id: 3,
    title: "Donor Matching",
    description: "Our system finds the nearest compatible donors so you can connect with them quickly for safe blood delivery."
  },
  {
    id: 4,
    title: "Connect & Donate",
    description: "Donors can contact the requester, track live location, and together coordinate the donation process efficiently."
  },
  {
    id: 5,
    title: "Save Lives",
    description: "Every successful donation helps save lives. Track your impact and feel the difference you make in the community."
  }
];

const Page5 = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const totalSteps = steps.length;
    const bar = barRef.current;
    const container = containerRef.current;

    stepRefs.current.forEach((step, idx) => {
      const stepTop = step.offsetTop - container.offsetTop;

      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveStep(idx);
          gsap.to(bar, {
            height: `${(idx / (totalSteps - 1)) * 100}%`,
            duration: 0.3,
            ease: "none"
          });
        },
        onEnterBack: () => {
          setActiveStep(idx);
          gsap.to(bar, {
            height: `${(idx / (totalSteps - 1)) * 100}%`,
            duration: 0.3,
            ease: "none"
          });
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
<div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-20">
  {/* Section Heading */}
  <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-red-700">
    Our Life-Saving Process
  </h2>

  {/* Progress & Steps Container */}
  <div ref={containerRef} className="relative flex w-full max-w-5xl px-6">
    {/* Progress Bar */}
    <div className="relative w-10 flex flex-col items-center">
      <div className="w-2 bg-gray-300 rounded-full h-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
      <div
        ref={barRef}
        className="w-2 bg-red-600 rounded-full h-0 absolute top-0 left-1/2 transform -translate-x-1/2 origin-top"
      ></div>

      {steps.map((step, idx) => (
        <div
          key={step.id}
          className="w-6 h-6 rounded-full border-2 border-red-600 bg-white z-10 absolute left-1/2 transform -translate-x-1/2"
          style={{ top: `${(idx / (steps.length - 1)) * 100}%` }}
        ></div>
      ))}
    </div>

    {/* Step Descriptions */}
    <div className="ml-12 flex flex-col gap-y-24 w-full">
      {steps.map((step, idx) => (
        <div
          key={step.id}
          ref={(el) => (stepRefs.current[idx] = el)}
          className={`p-6 rounded-xl transition-all duration-300 ${
            activeStep === idx ? "bg-red-100 shadow-lg" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
          <p className="text-gray-700">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Page5;
