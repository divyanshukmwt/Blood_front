import React from "react";
import { motion } from "framer-motion";

const parentVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const container = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const letter = {
  initial: { opacity: 0, y: 100, scale: 0.4 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeIn" },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const letters = ["B", "l", "o", "o", "d", "_", "H", "u", "b"];
const colors = [
  "#ef4444",
  "#f59e0b",
  "#eab308",
  "#10b981",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

const Loder = () => {
  return (
    <motion.div
      className="fixed font-Roboto top-0 left-0 w-full h-screen z-[999] bg-black flex items-center justify-center text-white text-6xl lg:text-9xl"
      variants={parentVariants}
      initial="initial"
      animate="animate"
      exit="exit">
      <motion.h1 variants={container} className="flex gap-1">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            style={{ color: colors[index] }}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Loder;
