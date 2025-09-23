import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { receiveMessage, sendMessage } from "../config/Socket";
import { AdminContext } from "../context/admin.context";

const SelectBox = ({ option }) => {
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

  const handelTimer = async () => {
    if (selected === "Select Time :") {
      toast.error("❌ Choose wisely");
    } else {
      sendMessage("Timer-Change", selected);
      toast.success("🎉 Update successfully.")
    }
  }
  useEffect(() => {
    receiveMessage("ChangeTime", (data) => {
      setAdmin(data);
    });
  }, [])

  return (

    <>
      <div className="relative font-Poppins w-full" ref={wrapperRef}>
        {/* Dropdown */}
        <div
          className={`bg-white text-gray-900 px-5 py-3 w-full cursor-pointer select-none relative rounded-md ${isOpen ? "rounded-b-none border-red-600 border" : "border border-red-600"
            }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <span className="absolute top-1/2 right-5 -translate-y-1/2">
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block w-3 h-3 border-t-2 border-r-2 border-red-600 transform"
            />
          </span>
        </div>


        {/* Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-white text-gray-900 z-50 rounded-b-md shadow-lg border border-red-600"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {option.map((opt, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(opt)}
                  className={`px-4 py-2 cursor-pointer hover:bg-red-100 ${opt === selected ? "bg-red-200" : ""
                    }`}
                >
                  {opt}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Set Timer Button */}
      <button
        onClick={handelTimer}
        className="bg-red-600 hover:bg-red-700 text-white rounded-md border border-red-700 absolute bottom-5 px-8 py-2 font-Poppins transition-all duration-200"
      >
        Set Timer
      </button>
    </>

  );
};

export default SelectBox;
