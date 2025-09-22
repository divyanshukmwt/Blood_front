import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/user.context"
import Axios from "../config/Axois"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Otp = () => {
  const { user } = useContext(UserContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);
  const intervalRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    inputsRef.current[0]?.focus();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);
    console.log("Re-send");
    await Axios.post("/users/resendOtp", { email: user.email });
  };

  const otpValue = otp.join("");

  const otpSubmiter = async (e) => {
    e.preventDefault();
    try {
      if (otpValue.length == 4) {
        const res = await Axios.post("/users/otp-verify", { email: user.email, otpValue });
        localStorage.setItem("userToken", res.data.token);
        navigate("/users/profile")
        toast.success("🎉 Login successfully.")
      }
      else toast.error("❌ OTP Must be 4 Digit.")
    } catch (err) {
      toast.error("❌ Something went wrong!")
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 flex justify-center items-center">
      <div className="border border-gray-200 bg-white w-[90%] lg:w-[30%] rounded-lg px-8 py-10 flex flex-col gap-y-8 items-center shadow-lg">

        {/* Header */}
        <h1 className="text-4xl mb-2 font-Poppins uppercase border-b-2 border-r-2 border-blue-400 shadow-lg px-4 pb-2 text-red-600">
          OTP Center
        </h1>

        {/* Instruction */}
        <p className="text-red-500 font-Roboto text-lg text-center">
          Please check your mail inbox section or spam section.
        </p>

        {/* OTP Form */}
        <form className="flex flex-col gap-y-4 items-center lg:px-5">
          <div className="flex gap-x-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="bg-gray-100 text-2xl font-Roboto block rounded-2xl w-15 px-4 py-6 text-center outline-none transition-all duration-200 border border-gray-300 focus:border-red-500"
                type="text"
              />
            ))}
          </div>
          <input type="hidden" value={otpValue} />
          <button
            type="submit"
            onClick={otpSubmiter}
            className="bg-red-600 hover:bg-red-700 font-Poppins text-2xl py-4 px-24 mt-6 rounded-lg cursor-pointer transition-all duration-200"
          >
            Confirm
          </button>
        </form>

        {/* Timer / Resend */}
        {timer > 0 ? (
          <p className="text-gray-700">
            Resend OTP in <span className="text-red-600 font-semibold">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="bg-orange-500 hover:bg-orange-600 font-Poppins text-2xl py-4 px-20 rounded-lg cursor-pointer transition-all duration-200"
          >
            Re-Send OTP
          </button>
        )}
      </div>
    </div>

  );
};

export default Otp;
