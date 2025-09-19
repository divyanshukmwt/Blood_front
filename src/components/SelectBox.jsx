import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { receiveMessage, sendMessage } from "../config/Socket";
import { AdminContext } from "../context/admin.context";

const SelectBox = ({option}) => {
  const [selected, setSelected] = useState("Select Time ⌚");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { setAdmin } = useContext(AdminContext);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handelTimer = async ()=>{
    if (selected === "Select Time :"){
      toast.error("❌ Choose wisely");
    } else {
      sendMessage("Timer-Change", selected);
      toast.success("🎉 Update successfully.")
    }
  }
  useEffect(() => {
    receiveMessage("ChangeTime",(data)=>{
      setAdmin(data);
    });
  }, [])
  
  return (
    <>
    <div className="relative font-sans w-full" ref={wrapperRef}>
      <div
        className={`bg-zinc-800/60 text-white px-5 py-2 w-full cursor-pointer select-none relative rounded-md ${
          isOpen ? "rounded-b-none" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <span className="absolute top-1/2 right-5 -translate-y-1/2">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block w-2 h-2 border-t-8 border-x-8 border-x-transparent border-t-white"
          />
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-zinc-800/60 text-white z-50 rounded-b-md shadow-lg"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}>
            {option.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-zinc-800 ${
                  option === selected ? "bg-zinc-800" : ""
                }`}>
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <button
    onClick={handelTimer}
    className="bg-zinc-900 rounded-md border-2 absolute bottom-5 px-10 py-2">Set Timer</button>
    </>
  );
};

export default SelectBox;
