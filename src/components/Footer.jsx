import React from 'react'
import Button from './Button';
import {motion} from "motion/react"
const Footer = () => {
  return (
    <div className="flex flex-col gap-y-2 bg-[#0c0c0c] py-2">
      <h1 className="text-zinc-400 italic font-bold pt-2 px-10 lg:px-14 w-full font-Poppins text-2xl">
        Blood_Hub
      </h1>
      <p className="text-zinc-500 lg:text-center py-2 px-10 w-full font-Poppins text-xl">
        Together, we can save lives and build a healthier India. Every drop of
        blood is a gift of hope — one donation can save three lives. Be the
        reason someone survives, smiles, and lives another day.
      </p>
      <div className="w-[90%] h-[1px] bg-zinc-600 mx-auto"></div>
      <div className="w-full  py-7 px-10 gap-y-10 text-white bg-[#0c0c0c] flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col gap-y-5">
          <h1 className="font-OpenSans text-4xl lg:text-2xl">Service</h1>
          <Button navigating={"/reciver/blood"} text={"Receiver"} />
          <Button navigating={"/donate/request-list"} text={"Donation"} />
          <a
            className="text-2xl w-fit overflow-y-hidden h-[3.25rem]"
            href="https://www.instagram.com/p/DI8Y8ggyCWv/"
            target="_blank">
            <motion.div
              className="w-full h-fit overflow-y-auto px-6 py-2"
              initial={{ y: "0%" }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "circOut" }}>
              <p className="mt-1 mb-2">How to Use</p>
              <p className="mt-5">How to Use</p>
            </motion.div>
          </a>
        </div>
        <div className="w-full h-[1px] lg:h-70 lg:w-[1px] bg-zinc-600 mx-auto"></div>
        <div className="flex flex-col gap-y-5">
          <h1 className="font-OpenSans text-4xl lg:text-2xl">Helps</h1>
          <a
            className="text-2xl w-fit overflow-y-hidden h-[3.25rem]"
            href="mailto:firefighters4511@gmail.com">
            <motion.div
              className="w-full h-fit overflow-y-auto px-6 py-2"
              initial={{ y: "0%" }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "circOut" }}>
              <p className="mt-1 mb-2">Gmail</p>
              <p className="mt-5">Gmail</p>
            </motion.div>
          </a>
          <Button navigating={"/admin"} text={"Admin"} />
          <Button navigating={"/users/contactUs"} text={"Contact Us"} />
        </div>
        <div className="w-full h-[1px] lg:h-70 lg:w-[1px] bg-zinc-600 mx-auto"></div>
        <div className="flex flex-col gap-y-5">
          <h1 className="font-OpenSans text-4xl lg:text-2xl">Legal</h1>
          <a
            className="text-2xl w-fit overflow-y-hidden h-[3.25rem]"
            href="src/assets/pdfs/Terms of Use.pdf"
            download="Terms Of Use">
            <motion.div
              className="w-full h-fit overflow-y-auto px-6 py-2"
              initial={{ y: "0%" }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "circOut" }}>
              <p className="mt-1 mb-2">Terms of Use</p>
              <p className="mt-5">Terms of Use</p>
            </motion.div>
          </a>
          <a
            className="text-2xl w-fit overflow-y-hidden h-[3.25rem]"
            href="src/assets/pdfs/Cookie Policy.pdf"
            download="Cookie Policy">
            <motion.div
              className="w-full h-fit overflow-y-auto px-6 py-2"
              initial={{ y: "0%" }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "circOut" }}>
              <p className="mt-1 mb-2">Cookie Policy</p>
              <p className="mt-5">Cookie Policy</p>
            </motion.div>
          </a>
          <a
            className="text-2xl w-fit overflow-y-hidden h-[3.25rem]"
            href="src/assets/pdfs/Privacy Policy.pdf"
            download="Privacy Policy">
            <motion.div
              className="w-full h-fit overflow-y-auto px-6 py-2"
              initial={{ y: "0%" }}
              whileHover={{ y: "-50%" }}
              transition={{ duration: 0.3, ease: "circOut" }}>
              <p className="mt-1 mb-2">Privacy Policy</p>
              <p className="mt-5">Privacy Policy</p>
            </motion.div>
          </a>
        </div>
      </div>
      <div className="w-[90%] h-[1px] bg-zinc-600 mx-auto"></div>
      <p className="bg-[#0c0c0c] text-white text-center py-2 font-OpenSans text-xl">
        &copy; reserve by Blood_Hub
      </p>
    </div>
  );
}

export default Footer