import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AdminContext } from "../context/admin.context"
import AdminAxios from "../config/AdminAxios"
import { toast } from 'react-toastify';
const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await AdminAxios.post("/admin/login", { email, password });
      setAdmin(res.data.admin);
      localStorage.setItem("adminToken", res.data.token)
      navigate("/admin")
      toast.success("🎉 Login successfully.");
    } catch (error) {
      toast.error("❌ Try again!");
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center text-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 w-[90%] lg:w-[35%] border border-gray-200 bg-white px-6 py-10 rounded-lg shadow-lg"
      >
        {/* Heading */}
        <h1 className="text-3xl font-Poppins text-center uppercase text-red-600">
          Admin Login
        </h1>

        {/* Email Input */}
        <div>
          <label className="font-Poppins text-xl" htmlFor="email">
            Email:
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="font-Roboto mt-2 border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-red-500 transition-all duration-200"
            placeholder="Enter your email..."
            type="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500 font-Roboto mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="font-Poppins text-xl" htmlFor="password">
            Password:
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="font-Roboto mt-2 border border-gray-300 rounded px-3 py-2 w-full outline-none focus:border-red-500 transition-all duration-200"
            placeholder="Enter your password..."
            type="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-500 font-Roboto mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-Poppins rounded-md transition-all duration-200 mt-5"
        >
          Login
        </button>
      </form>
    </div>

  );
}

export default AdminLogin