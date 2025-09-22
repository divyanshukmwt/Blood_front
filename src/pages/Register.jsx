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
   <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 text-gray-900">
  <div className="border border-gray-200 flex flex-col gap-y-5 items-center w-[90%] lg:w-[40%] bg-white rounded-md py-10 lg:py-5 px-5 shadow-lg">

    <h1 className="font-Poppins text-xl uppercase text-red-600">
      Register Yourself Today
    </h1>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[98%] py-5 flex flex-col gap-y-5 items-center">

      {/* Name input */}
      <div className="w-[90%]">
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 6, message: "Name must be at least 6 characters" },
            pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters and spaces" },
            validate: (value) => {
              const lowerValue = value.toLowerCase();
              const hasBadWord = AbandonWord.some((bad) =>
                lowerValue.includes(bad)
              );
              return hasBadWord ? "Name contains restricted or offensive words!" : true;
            },
          })}
          onBlur={(e) => setValue("name", e.target.value.trim(), { shouldValidate: true })}
          type="text"
          className="bg-gray-100 border border-gray-300 focus:border-red-500 outline-none transition-all duration-200 px-3 py-2 block w-full rounded-md"
          placeholder="Name...."
        />
        {errors.name && (
          <p className="text-red-500 font-Roboto mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email input */}
      <div className="w-[90%]">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
          })}
          onBlur={(e) => setValue("email", e.target.value.trim(), { shouldValidate: true })}
          type="email"
          className="bg-gray-100 border border-gray-300 focus:border-red-500 outline-none transition-all duration-200 px-3 py-2 block w-full rounded-md"
          placeholder="Email...."
        />
        {errors.email && (
          <p className="text-red-500 font-Roboto mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password input */}
      <div className="w-[90%]">
        <div className="relative w-full">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
              },
            })}
            type={show ? "password" : "text"}
            className="bg-gray-100 border border-gray-300 focus:border-red-500 outline-none transition-all duration-200 px-3 py-2 block w-full rounded-md"
            placeholder="Password...."
          />
          <button
            type="button"
            onClick={() => setshow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">
            {show ? (
              <TbEyeCancel className="text-red-500/70" />
            ) : (
              <TbEyeCheck className="text-green-500/70" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 font-Roboto mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-red-600 text-white text-2xl py-2 w-[90%] rounded-md mt-5 cursor-pointer font-Poppins hover:bg-red-700 transition-all duration-200">
        Confirm
      </button>
    </form>

    {/* Divider */}
    <div className="w-[90%] flex gap-x-2 items-center mt-5">
      <div className="h-[1.5px] w-full bg-red-500"></div>
      <h1 className="font-Roboto text-2xl text-gray-400">Or</h1>
      <div className="h-[1.5px] w-full bg-red-500"></div>
    </div>

    {/* Google Register */}
    <div className="flex flex-col items-center gap-4 mt-4">
      <h1 className="font-Poppins text-2xl lg:text-xl text-gray-900">Register with</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>

    {/* Already have an account */}
    <div className="flex w-[90%] gap-x-3 lg:gap-x-10 justify-center mt-4">
      <h1 className="font-Poppins text-lg lg:text-xl text-gray-900">
        Already have an account?
      </h1>
      <button
        onClick={() => navigate("/login")}
        className="font-Roboto text-xl text-red-600 cursor-pointer">
        Login
      </button>
    </div>

    {/* Terms and privacy */}
    <div className="mt-4">
      <p className="text-center font-Roboto text-lg text-gray-600">
        By signing up, you agree to our{" "}
        <span className="text-red-600">Terms of Service</span> and{" "}
        <span className="text-red-600">Privacy Policy</span>
      </p>
    </div>
  </div>
</div>

  );
};

export default Register;
