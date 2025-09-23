import React from 'react'
import { motion } from "motion/react"

const Footer = () => {
  const links = {
    service: [
      { name: "Receiver", href: "/reciver/blood" },
      { name: "Donation", href: "/donate/request-list" },
    ],
    helps: [
      { name: "Gmail", href: "mailto:codxdot@gmail.com" },
      { name: "Admin", href: "/admin" },
      { name: "Contact Us", href: "/users/contactUs" },
    ],
    legal: [
      { name: "Terms of Use", href: "src/assets/pdfs/Terms of Use.pdf", download: true },
      { name: "Cookie Policy", href: "src/assets/pdfs/Cookie Policy.pdf", download: true },
      { name: "Privacy Policy", href: "src/assets/pdfs/Privacy Policy.pdf", download: true },
    ],
  }

  const renderLinks = (items) => {
    return items.map((link, i) => (
      <a
        key={i}
        className="text-lg w-fit overflow-y-hidden h-[3rem]"
        href={link.href}
        {...(link.target && { target: link.target })}
        {...(link.download && { download: link.name })}
      >
        <motion.div
          className="w-full h-fit overflow-y-auto px-4 py-1 cursor-pointer text-gray-700"
          initial={{ y: "0%" }}
          whileHover={{ y: "-50%" }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          <p className="mt-1 mb-1">{link.name}</p>
          <p className="mt-3">{link.name}</p>
        </motion.div>
      </a>
    ))
  }

  return (
    <div className="flex flex-col font-[oswald] gap-y-4 bg-white py-4">
      {/* Brand & Motto */}
      <h1 className="text-gray-700 font-bold pt-2 text-4xl text-center">
        Red Hope
      </h1>
      <p className="text-gray-600 lg:text-center py-2 px-10 w-full font-[oswald] text-xl">
        Together, we can save lives and build a healthier India. Every drop of blood is a gift of hope — one donation can save three lives. Be the reason someone survives, smiles, and lives another day.
      </p>

      <div className="w-[90%] h-[1px] bg-gray-300 mx-auto"></div>

      {/* Footer Sections */}
      <div className="w-full py-7 px-10 gap-y-10 flex flex-col lg:flex-row lg:justify-between lg:items-start">
        {/* Service */}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <h1 className="font-[oswald] text-3xl lg:text-4xl text-gray-800">Service</h1>
          {renderLinks(links.service)}
        </div>

        <div className="w-full h-[1px] lg:h-40 lg:w-[1px] bg-gray-300 mx-auto"></div>

        {/* Helps */}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <h1 className="font-[oswald] text-3xl lg:text-4xl text-gray-800">Helps</h1>
          {renderLinks(links.helps)}
        </div>

        <div className="w-full h-[1px] lg:h-40 lg:w-[1px] bg-gray-300 mx-auto"></div>

        {/* Legal */}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <h1 className="font-[oswald] text-3xl lg:text-4xl text-gray-800">Legal</h1>
          {renderLinks(links.legal)}
        </div>
      </div>

      <div className="w-[90%] h-[1px] bg-gray-300 mx-auto"></div>

      <p className="bg-white text-gray-600 text-center py-2 font-[oswald] text-lg">
        &copy; Reserved by Red Hope
      </p>
    </div>

  );
}

export default Footer;

