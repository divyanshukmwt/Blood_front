import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Button = ({ navigating, text, val }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${
        val
          ? "bg-rose-900/90 hover:bg-rose-900/70 font-extrabold"
          : "font-medium"
      } w-fit tracking-wide text-white rounded-md overflow-y-hidden h-[3.25rem] cursor-pointer font-Poppins text-2xl transition-all duration-300`}
      onClick={() => navigate(navigating)}>
      <motion.div
        initial={{ y: "0%" }}
        whileHover={{ y: "-50%" }}
        transition={{ duration: 0.3, ease: "circOut" }}
        className="w-full h-fit overflow-y-auto px-6 py-2">
        <p className="mt-1 mb-2">{text}</p>
        <p className="mt-5">{text}</p>
      </motion.div>
    </button>
  );
};

export default Button;
