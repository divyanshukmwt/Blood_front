import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../utils/Navbar';
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import Animate from '../components/Animate';

const PageNotFound = () => {
    const animateRef = useRef();
    const containerRef = useRef();
    const paraRef = useRef();
    useEffect(() => {
      document.fonts.ready.then(() => {
        if (!containerRef.current) return;

        const wavyElement = containerRef.current.querySelector(".wavy");
        if (!wavyElement) return;

        const { chars } = splitText(wavyElement);
        containerRef.current.style.visibility = "visible";

        const staggerDelay = 0.55;

        animate(
          chars,
          { y: [-20, 20] },
          {
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            duration: 2,
            delay: stagger(staggerDelay, {
              startDelay: -staggerDelay * chars.length,
            }),
          }
        );
      });
    }, []);
    useEffect(() => {
      document.fonts.ready.then(() => {
        if (!paraRef.current) return;

        const paraElement = paraRef.current.querySelector(".para");
        if (!paraElement) return;

        const { chars } = splitText(paraElement);
        paraRef.current.style.visibility = "visible";

        const staggerDelay = 0.15;

        animate(
          chars,
          { y: [-20, 20] },
          {
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            duration: 2,
            delay: stagger(staggerDelay, {
              startDelay: -staggerDelay * chars.length,
            }),
          }
        );
      });
    }, []);
  return (
    <Animate ref={animateRef}>
      <div className="text-white cursor-help flex flex-col gap-y-32 lg:gap-y-13 items-center justify-center h-screen">
        <Navbar
          animateRef={animateRef}
          field={[
            { link: "/", name: "Home" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
          ]}
        />
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div ref={containerRef}>
            <h1 className="wavy text-9xl lg:text-[10vw] font-OpenSans text-[#FF0000] drop-shadow-[0px_0px_15px_rgba(255,0,0,0.9)] font-extralight tracking-widest">
              404
            </h1>
          </div>
          <div ref={paraRef}>
            <p className="para text-4xl lg:text-5xl uppercase font-Poppins text-[#FF0000] ">
              Page Not Found
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="bg-zinc-700 text-green-400 px-4 py-2 rounded-md font-Poppins flex items-center justify-center text-2xl lg:text-lg">
          Go Home Please 😊
        </Link>
      </div>
    </Animate>
  );
}

export default PageNotFound;