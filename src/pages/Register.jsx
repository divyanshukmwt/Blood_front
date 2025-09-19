import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import AbandonWord from "../utils/AbandonWord"
import { TbEyeCancel } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setshow] = useState(true);

  const onSubmit = async (data) => {
    try {
      const res = await Axios.post("/users/register", data);
      if( res.status === 201 ){
        setUser(res.data.user);
        navigate("/otp");
        toast.success("🎉 Register successfully.");
        toast.success("OTP send successfully.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await Axios.post("/google-auth/verify", {
        token: credentialResponse.credential,
      });
      setUser(res.data);
      navigate("/otp");
      if(res.status === 201){
        toast.success("🎉 Register successfully.");
        toast.success("OTP send successfully.");
      } else {
        toast.success("🎉 Login successfully.");
        toast.success("OTP send successfully.");
      }
    } catch (err) {
      toast.error("Google signup failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed. Please try again.");
  };

  return (
    <div className="w-full min-h-screen text-white bg-black flex justify-center items-center">
      <div className="border-2 border-zinc-800 flex flex-col gap-y-5 items-center w-[90%] lg:w-[40%] bg-[#121212] rounded-md py-10 lg:py-5 px-5">
        <h1 className="font-Poppins text-xl uppercase">
          Register Your Self Today
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[98%] py-5 flex flex-col gap-y-5 items-center">
          {/* Name input */}
          <div className="w-[90%]">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 6,
                  message: "Name must be at least 6 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name must contain only letters and spaces",
                },
                validate: (value) => {
                  const lowerValue = value.toLowerCase();
                  const hasBadWord = AbandonWord.some((bad) =>
                    lowerValue.includes(bad)
                  );
                  return hasBadWord
                    ? "Name contains restricted or offensive words!"
                    : true;
                },
              })}
              onBlur={(e) => {
                const trimmed = e.target.value.trim();
                setValue("name", trimmed, { shouldValidate: true });
              }}
              type="text"
              className="bg-zinc-800 border border-zinc-800 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-full rounded-md"
              placeholder="Name...."
            />
            {errors.name && (
              <p className="text-[#FF3B30] font-Roboto">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email input */}
          <div className="w-[90%]">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              onBlur={(e) => {
                const trimmed = e.target.value.trim();
                setValue("email", trimmed, { shouldValidate: true });
              }}
              type="email"
              className="bg-zinc-800 border border-zinc-800 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-full rounded-md"
              placeholder="Email...."
            />
            {errors.email && (
              <p className="text-[#FF3B30] font-Roboto">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password input */}
          <div className="w-[90%]">
            <div className="relative w-full">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
                  },
                })}
                type={show ? "password" : "text"}
                className="bg-zinc-800 border border-zinc-800 focus:border-sky-400 outline-none transition-all duration-200 px-2 py-2 block w-full rounded-md"
                placeholder="Password...."
              />
              <button
                onClick={() => setshow(!show)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl">
                {show ? (
                  <TbEyeCancel className="text-red-400/70" />
                ) : (
                  <TbEyeCheck className="text-green-400/70" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[#FF3B30] font-Roboto">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-sky-600 text-2xl py-2 w-[90%] rounded-md mt-5 cursor-pointer">
            Confirm
          </button>
        </form>

        {/* Divider */}
        <div className="w-[90%] flex gap-x-2 items-center">
          <div className="h-[1.5px] w-full bg-sky-400"></div>
          <h1 className="font-Roboto text-2xl">Or</h1>
          <div className="h-[1.5px] w-full bg-sky-400"></div>
        </div>

        {/* Google Login */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-Poppins text-2xl lg:text-xl">Register with</h1>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        {/* Already have an account */}
        <div className="flex w-[90%] gap-x-3 lg:gap-x-10 justify-center">
          <h1 className="font-Poppins text-lg lg:text-xl">
            Already have an account?
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="font-Roboto text-xl text-sky-500 cursor-pointer">
            Login
          </button>
        </div>

        {/* Terms and privacy */}
        <div>
          <p className="text-center font-Roboto text-lg">
            By signing up, you agree to our{" "}
            <span className="text-sky-500">Terms of Service</span> and{" "}
            <span className="text-sky-500">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
