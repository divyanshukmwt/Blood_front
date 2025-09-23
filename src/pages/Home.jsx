import React, { useRef } from 'react'
import Navbar from "../utils/Navbar"
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuMapPinCheck } from "react-icons/lu";
import { TiPinOutline } from "react-icons/ti";
import Para from '../components/Para';
import { MdAutoGraph } from "react-icons/md";
import Button from '../components/Button';
import Footer from '../components/Footer';
import landing from "../../public/landing.jpg"
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Testimonials from './Testimonials';
import AwarenessSection from './AwarenessSection';
import ContactSection from './ContactSection';
import Animate from '../components/Animate';
import Marquee from './Marquee';

const Home = () => {
  const animateRef = useRef(); 
  return (
    <Animate ref={animateRef}>
      <div className="w-full min-h-[100vh] bg-black">
        <Navbar
          field={[
            { link: "/users/profile", name: "Profile" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
          ]}
        />
        {/* Hero Section */}
        <div className='w-full h-screen'>
          <div className="w-full h-full bg-[#ffefef] flex flex-col-reverse md:flex-row items-center overflow-hidden">

            {/* Left side - Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-center text-center md:items-start md:text-left flex-1">
              <h1 className="text-4xl sm:text-2xl md:text-3xl lg:text-[5rem] font-[oswald] font-bold text-red-600 leading-none">
                REDHOPE
              </h1>
              <div className="flex flex-col leading-tight">
                <p className="text-gray-600 font-[inter] text-base sm:text-xl md:text-2xl lg:text-3xl ">
                  You don't have to be a doctor
                </p>
                <p className="text-red-600 font-[oswald] uppercase text-base sm:text-xl md:text-2xl lg:text-3xl font-regular">
                  to save a life
                </p>
              </div>
              <Button
                navigating={"/users/profile"}
                text={"Join Hope"}
                val={true}
              />
              <p className="text-gray-600 font-[inter] text-base sm:text-xl md:text-2xl lg:text-2xl">
                Be a Hero, we believe every drop of blood is more than just a donation; it’s a promise of hope, a gift of love, and a chance to save a life.
              </p>
            </div>

            {/* Right side - Image */}
            <div className="w-full h-full md:w-1/2 relative flex-1">
              <img
                src={landing}
                alt="Hero Image"
                className="w-full h-full object-[82%_0%] object-cover"
              />
            </div>

          </div> {/* End Hero Flex Container */}

          {/* Page2 Section */}
          <Page2 />
          <Page3/>
          <Page4/>
          <Page5/>
          <Testimonials/>
          <AwarenessSection/>
          <Marquee/>
          <ContactSection/>
          <Footer/>
        </div>
      </div>
      </Animate>
  );
}

export default Home;

