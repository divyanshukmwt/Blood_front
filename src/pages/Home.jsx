import React, { useRef } from 'react'
import Navbar from "../utils/Navbar"
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuMapPinCheck } from "react-icons/lu";
import { TiPinOutline } from "react-icons/ti";
import Para from '../components/Para';
import { MdAutoGraph } from "react-icons/md";
import Button from '../components/Button';
import Footer from '../components/Footer';
import Animate from "../components/Animate";
import landing from "../../public/landing.jpg"
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';

const Home = () => {
  const animateRef = useRef();
  return (
    <Animate ref={animateRef}>
      <div className="w-full min-h-[100vh] bg-black">
        <Navbar
          animateRef={animateRef}
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
        </div> {/* End Hero Section Wrapper */}


        {/* 
        <div className="w-full min-h-screen bg-[#fff0ed] flex flex-col items-start justify-center gap-y-20 py-2">
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-20 lg:gap-y-18 px-4 lg:px-10">
            <h1 className="text-6xl lg:text-7xl text-white font-Poppins font-semibold lg:w-[90%]">
              Welcome to LifeSaver – Connecting Blood Donors & Receivers
            </h1>
            <p className="text-2xl lg:text-3xl tracking-tight text-[#b9b9b9] font-Roboto font-normal lg:w-[90%] opacity-75 italic">
              Every drop counts! LifeSaver is a platform that bridges the gap
              between those in need of blood and willing donors. Whether you're
              looking to donate or find a donor, our easy-to-use system helps
              you connect instantly.
            </p>
          </div>
          <div className="flex flex-col gap-y-15 py-5 lg:gap-x-10 lg:flex-row">
            <Para
              H6={"Become a Lifesaver -"}
              Icon={<FaHandHoldingHeart />}
              Para={"Sign up as a donor and help save lives in just a few clicks."}
            />
            <Para
              H6={"Location-Based Matching -"}
              Icon={<LuMapPinCheck />}
              Para={"Connect with donors and recipients effortlessly with Map."}
            />
          </div>
        </div>
        <div className="w-full h-fit font-Poppins text-white flex items-center text-6xl lg:text-7xl text-center">
          <p className="py-20 px-6 lg:py-40 lg:px-20 leading-20 italic opacity-55">
            "The blood you donate today may be the gift of life for someone
            tomorrow."
          </p>
        </div>
        <div className="flex flex-col gap-y-15 py-5 lg:gap-x-10 lg:flex-row">
          <Para
            H6={"Our Mission"}
            Icon={<TiPinOutline />}
            Para={
              "To create a safe, sustainable, and transparent community that empowers people to contribute to the fight against low Blood supply in high demand."
            }
          />
          <Para
            H6={"Our Vision"}
            Icon={<MdAutoGraph />}
            Para={
              "To create a global community that uses technology to empower people to contribute Blood to save lives and be called a LifeSaver."
            }
          />
        </div>
        <div className="w-full h-fit px-4 lg:px-30 py-10 flex flex-col text-white gap-y-10">
          <h1 className="text-6xl lg:text-8xl lg:leading-30 font-Poppins">
            So Why you waiting, <br className="hidden lg:block" /> Hurry and
            Join Us Today!
          </h1>
          <Button
            navigating={"/users/profile"}
            text={"<= 🔗Sign Up As a LifeSaver🔗 =>"}
            val={false}
          />
        </div> 
        <Footer /> 
        */}

      </div> {/* End Main Container */}
    </Animate>
  );
}

export default Home;

