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
      if (res.status === 200) {
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
    <div className="w-full h-screen bg-gray-50 flex justify-center items-center text-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-[90%] lg:w-[30%] bg-white border border-gray-200 px-6 py-12 rounded-xl shadow-lg">

        <h1 className="text-3xl font-Poppins text-center uppercase text-red-600">
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
            className="font-Roboto mt-2 outline-none focus:border-red-500 transition-all duration-200 border border-gray-300 bg-gray-100 p-3 rounded-lg w-full placeholder:text-gray-400"
            placeholder="Enter your email..."
          />
          {errors.email && (
            <p className="text-red-500 font-Roboto mt-1">{errors.email.message}</p>
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
              className="font-Roboto mt-2 outline-none focus:border-red-500 transition-all duration-200 border border-gray-300 bg-gray-100 p-3 rounded-lg w-full"
              placeholder="Enter your password..."
              type={show ? "password" : "text"}
              id="password"
              autoComplete="true"
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

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-xl bg-red-600 hover:bg-red-700 transition-all duration-200 mt-4 cursor-pointer font-Poppins text-white">
          Login
        </button>

        <div>
          <p className="text-center font-Roboto text-lg mt-2">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-red-600 cursor-pointer ml-1">
              Register
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          <span className="w-[100px] h-[1px] bg-red-500"></span>
          <p className="text-lg text-gray-400">Or</p>
          <span className="w-[100px] h-[1px] bg-red-500"></span>
        </div>

        <div className="flex justify-center items-center gap-x-4 mt-4">
          <p className="text-lg text-gray-400">Login with</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>

        <div className="mt-4">
          <p className="text-center font-Roboto text-lg flex flex-col gap-y-2 text-gray-600">
            Don't remember your password?
            <Link to="/forget-password" className="text-red-600 cursor-pointer">
              Forget Password
            </Link>
          </p>
        </div>
      </form>
    </div>

  );
};

export default Login;
