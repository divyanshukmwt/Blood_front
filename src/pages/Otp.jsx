import React, { useState, useRef, useEffect, useContext } from "react";
import {UserContext} from "../context/user.context"
import Axios from "../config/Axois"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Otp = () => {
  const { user } = useContext(UserContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);
  const intervalRef = useRef(null);
  const navigate =  useNavigate()

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
    await Axios.post("/users/resendOtp", {email : user.email});
  };

  const otpValue = otp.join("");

  const otpSubmiter = async (e) => {
    e.preventDefault();
    try{
        if(otpValue.length == 4){
            const res = await Axios.post("/users/otp-verify",{email: user.email, otpValue});
            localStorage.setItem("userToken", res.data.token);
            navigate("/users/profile")
            toast.success("🎉 Login successfully.")
        }
        else toast.error("❌ OTP Must be 4 Digit.")
      }catch(err){
      toast.error("❌ Something went wrong!")
    }
  }

  return (
    <div className="w-full min-h-screen text-white bg-black flex justify-center items-center">
      <div className="border-2 border-zinc-700 bg-[#121212] w-[90%] lg:w-[30%] rounded-lg px-8 py-13 flex flex-col gap-y-10 items-center">
        <h1 className="text-4xl mb-2 bg-[#121212] font-Poppins uppercase border-b-2 border-r-2 shadow-[15px_15px_35px_rgba(0,0,255,0.8)] border-blue-400 px-4 pb-2">
          OTP Center
        </h1>
        <p className="text-[#FF3B30] font-Roboto text-lg text-center">
          Please Check Your mail inbox section or Spam section.
        </p>
        <form className="flex flex-col gap-y-2 items-center lg:px-5">
          <div className="flex gap-x-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="bg-zinc-800 text-2xl font-Roboto block rounded-2xl w-15 px-4 py-6 text-center outline-none transition-all duration-200 border-2 border-zinc-800 focus:border-sky-400"
                type="text"
              />
            ))}
          </div>
          <input type="hidden" value={otpValue} />
          <button
            type="submit"
            onClick={otpSubmiter}
            className="bg-sky-600 font-Poppins text-2xl py-4 px-26 mt-8 rounded-lg cursor-pointer transition-shadow duration-200">
            Confirm
          </button>
        </form>

        {timer > 0 ? (
          <p>
            Resend OTP in <span className="text-blue-400">{timer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="bg-[#ff754b] font-Poppins text-2xl py-4 px-18 rounded-lg cursor-pointer transition-shadow duration-200">
            Re-Send OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default Otp;
