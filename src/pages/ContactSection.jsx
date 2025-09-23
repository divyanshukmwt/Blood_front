import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../utils/Navbar";
import Footer from "../components/Footer";
import Axios from "../config/Axois";
import AbandonWord from "../utils/AbandonWord";
import { motion } from "motion/react";

const ContactSection = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    reset();
    try {
      const res = await Axios.post("/users/contactUs", {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      if (res.status === 200) {
        toast.success("Message sent successfully!");
        navigate("/"); // or any page you want
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error, please try again later.");
      console.error(err);
    }
  };

  return (
   <div className="w-full min-h-screen bg-white text-gray-800">

  {/* Contact Form Section */}
  <div className="w-full min-h-screen flex justify-center lg:py-20 items-center">
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6 bg-gray-100 px-8 py-10 w-[90%] lg:w-[40%] shadow-2xl rounded-2xl border border-gray-300"
    >
      <h1 className="text-center text-red-600 font-Poppins text-3xl">
        Contact / Support
      </h1>
      <p className="text-gray-600 text-center mb-4">
        Send us a message. We'll get back to you as soon as possible.
      </p>

      {/* Name */}
      <div>
        <label className="font-Poppins text-lg" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
          className="mt-2 w-full p-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-red-500 transition-all duration-200"
        />
        {errors.name && (
          <p className="text-red-500 mt-1 font-Roboto">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="font-Poppins text-lg" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
          className="mt-2 w-full p-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-red-500 transition-all duration-200"
        />
        {errors.email && (
          <p className="text-red-500 mt-1 font-Roboto">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="font-Poppins text-lg" htmlFor="message">
          Message:
        </label>
        <textarea
          id="message"
          placeholder="Enter your message..."
          {...register("message", {
            required: "Message is required",
            validate: (value) => {
              const lowerValue = value.toLowerCase();
              const hasBadWord = AbandonWord.some((bad) =>
                lowerValue.includes(bad)
              );
              return hasBadWord
                ? "Message contains restricted or offensive words!"
                : true;
            },
          })}
          className="mt-2 w-full h-40 p-3 rounded-lg border border-gray-300 resize-none bg-white outline-none focus:border-red-500 transition-all duration-200"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 mt-1 font-Roboto">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-Poppins transition-all duration-200"
      >
        Send Message
      </motion.button>
    </motion.form>
  </div>
</div>

  );
};

export default ContactSection;
