import React, { useRef, useState } from 'react'
import Navbar from "../utils/Navbar"
import AboutCards from '../components/AboutCards';
import AboutDets  from '../utils/About';
import Animate from "../components/Animate"
import Footer from "../components/Footer"
const About = () => {
  const animateRef = useRef();
    const [eachCard, setEachCard] = useState(AboutDets);
  return (
    <Animate ref={animateRef}>
      <div className="w-full min-h-screen bg-black text-white">
        <Navbar
          animateRef={animateRef}
          field={[
            { link: "/users/profile", name: "Profile" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/", name: "Home" },
            { link: "/users/contactUs", name: "Contact Us" },
          ]}
        />
        <div className="flex flex-col gap-y-4 pt-20 px-4 pb-4">
          {eachCard.map((item, index) => {
            return (
              <AboutCards
                key={index}
                src={item.img}
                name={item.name}
                role={item.role}
                para={item.para}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </Animate>
  );
}

export default About