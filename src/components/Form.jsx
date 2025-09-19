import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";

const Form = ({ fn }) => {
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try{
      const res = await Axios.post("/users/alldets", data);
    setUser(res.data);
    fn(false);
    toast.success("👏🏽 Update successfully!");
  } catch (err){
    toast.error("❌ Something went wrong!");
  }
  };

  return (
    <div className="fixed bg-transparent backdrop-blur-3xl h-screen w-full z-[999]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute flex flex-col gap-y-5 items-center w-[90%] lg:w-[50%] text-white -translate-x-1/2 -translate-y-1/2 bg-zinc-700/70 top-1/2 left-1/2 px-5 py-10 rounded-lg">
        <div className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-3 w-[95%]">
          <div className="flex flex-col gap-y-3 w-full">
            <input
              {...register("number", {
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Number must be exactly 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Number must be exactly 10 digits",
                },
              })}
              type="number"
              placeholder="Enter Your Number"
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none"
            />
            {errors.number && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.number.message}
              </p>
            )}
            <input
              type="number"
              {...register("emargencyNumber", {
                required: "Emergency number is required",
                minLength: {
                  value: 10,
                  message: "Number must be exactly 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Number must be exactly 10 digits",
                },
              })}
              placeholder="Enter Emergency Contact"
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none"
            />
            {errors.emargencyNumber && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.emargencyNumber.message}
              </p>
            )}
            <input
              type="date"
              {...register("dob", {
                required: "Please Enter The DOB",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const minDate = new Date("1960-01-01");
                  const today = new Date();
                  if (selectedDate < minDate) {
                    return "DOB must be from 1960 or later";
                  }
                  if (selectedDate > today) {
                    return "DOB cannot be in the future";
                  }
                  return true;
                },
              })}
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none"
            />
            {errors.dob && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.dob.message}
              </p>
            )}
            <input
              type="number"
              {...register("weight", {
                required: "Weight is required",
                min: {
                  value: 30,
                  message: "Weight must be at least 30kg",
                },
                max: {
                  value: 200,
                  message: "Weight must be realistic (under 200kg)",
                },
              })}
              placeholder="Enter Your Weight (kg)"
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none"
            />
            {errors.weight && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.weight.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <input
              type="number"
              {...register("height", {
                required: "Height is required",
                min: {
                  value: 90,
                  message: "Height must be at least 90 cm",
                },
                max: {
                  value: 250,
                  message: "Height must be realistic (under 250 cm)",
                },
              })}
              placeholder="Enter Your Height (cm)"
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none"
            />
            {errors.height && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.height.message}
              </p>
            )}
            <input
              type="text"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 5,
                  message: "Address must be at least 5 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Address must not exceed 30 characters",
                },
                pattern: {
                  value: /^(?!\d+$)[a-zA-Z0-9\s]+$/,
                  message: "Not Valid Address.",
                },
              })}
              placeholder="Enter Your Address"
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none"
            />
            {errors.address && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.address.message}
              </p>
            )}
            <select
              {...register("gender", {
                required: "Please select the Gender",
                validate: (value) =>
                  value !== "default" || "Please select a valid Gender",
              })}
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none">
              <option value="default">Select The Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
            {errors.gender && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.gender.message}
              </p>
            )}
            <select
              {...register("bloodGroup", {
                required: "Please select a blood group",
                validate: (value) =>
                  value !== "default" || "Please select a valid blood group",
              })}
              className="bg-zinc-800 w-full text-white text-xl font-Roboto py-2 px-4 rounded-lg border-2 border-zinc-700/70 focus:border-sky-400 transition-all duration-200 outline-none">
              <option value="default">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && (
              <p className="text-[#FF3B30] text-xl font-Roboto">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>
        </div>
        <input
          type="submit"
          value="Confirm"
          className="bg-sky-500 w-full py-2 rounded-lg font-Poppins text-xl"
        />
      </form>
    </div>
  );
};

export default Form;
