import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { TbEyeCancel } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setshow] = useState(true);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await Axios.post("/users/login", { email, password });
      if(res.status === 200){
        setUser(res.data);
        navigate("/otp");
        toast.success("🎉 OTP successfully.")
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("❌ Something went wrong!")
    }
  };
  
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await Axios.post("/google-auth/verify", {
        token: credentialResponse.credential,
      });
      setUser(res.data);
      navigate("/otp");
      toast.success("🎉 OTP successfully.")
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleLoginError = () => {
    toast.error("❌ Something went wrong!");
  };

  return (
    <div className="w-full h-screen bg-zinc-black flex justify-center items-center text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%] lg:w-[30%] bg-[#121212] border-2 border-zinc-800 px-5 py-10 rounded-lg">
        <h1 className="text-3xl font-Poppins text-center uppercase">
          Login Now
        </h1>

        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="font-Roboto mt-2 outline-none focus:border-sky-400 transition-all duration-200 border-2 border-zinc-800 bg-zinc-800 p-2 rounded w-full placeholder:text-[#A1A1AA]"
            placeholder="Enter your email..."
          />
          {errors.email && (
            <p className="text-[#FF3B30] font-Roboto">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative w-full">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="font-Roboto mt-2 outline-none focus:border-sky-400 transition-all duration-200 border-2 border-zinc-800 bg-zinc-800 p-2 rounded w-full"
              placeholder="Enter your password..."
              type={show ? "password" : "text"}
              id="password"
              autoComplete="true"
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

        <button
          type="submit"
          className="w-full py-2 rounded-md text-xl bg-sky-600 mt-5 cursor-pointer">
          Login
        </button>

        <div>
          <p className="text-center font-Roboto text-lg">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-sky-500 cursor-pointer">
              {" "}
              Register
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <span className="w-[100px] h-[1px] bg-sky-500"></span>
          <p className="text-lg">Or</p>
          <span className="w-[100px] h-[1px] bg-sky-500"></span>
        </div>

        <div className="flex justify-center items-center gap-x-4">
          <p className="text-lg ">Login with</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>

        <div>
          <p className="text-center font-Roboto text-lg flex flex-col gap-y-2">
            Don't remember your password?
            <Link to="/forget-password" className="text-sky-500 cursor-pointer">
              Forget Password
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
