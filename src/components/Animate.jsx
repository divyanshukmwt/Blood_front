import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Animate = forwardRef(({ children }, ref) => {
  return (
    <motion.div
      className="w-full min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
});

export default Animate;
