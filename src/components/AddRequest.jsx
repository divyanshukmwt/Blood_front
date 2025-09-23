import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { CgCloseR } from "react-icons/cg";
import { receiveMessage, sendMessage } from "../config/Socket";
import { toast } from 'react-toastify';
import moment from 'moment';

const timecalculator = (time) => {
  if (time == 60) return "60s";
  else if (time == 120) return "2min";
  else if (time == 300) return "5min";
  else if (time == 600) return "10min";
  else if (time == 1800) return "30min";
  else if (time == 3600) return "1hr";
};

const AddRequest = ({ time }) => {
  const [Mortal, setMortal] = useState(false);
  const [Delaytimer, setDelayTimer] = useState(timecalculator(time));
  const [Time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [allow, setAllow] = useState(true);
  const [NextTime, setNextTime] = useState("");
  const [reqComing, setReqComing] = useState(false);

  const ref = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitFrom = (data) => {
    try {
      const { bloodGroup, number, urgency } = data;
      const fromHandeler = async () => {
        sendMessage("blood-request", { bloodGroup, number, date, Time, urgency });
        reset();
      }
      fromHandeler();
      setMortal(false);
      setReqComing(false);
      toast.success("🎉 Added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("❌ Something error!");
    }
  }
  useEffect(() => {
    if (!ref.current) return;

    if (Mortal === true && date && Time) {
      ref.current.classList.add("block");
      ref.current.classList.remove("hidden");
      sendMessage("seeAllowRequest", { date, Time });
    } else {
      ref.current.classList.remove("block");
      ref.current.classList.add("hidden");
    }
  }, [Mortal, date, Time]);

  useEffect(() => {
    const localTime = moment().format("hh:mm A");
    const localDate = moment().format("DD/MM/YYYY");
    setDate(localDate);
    setTime(localTime);
    receiveMessage("delayTime", (data) => {
      setDelayTimer(timecalculator(data))
    });
  }, [])

  useEffect(() => {
    receiveMessage("allowingResult", (data) => {
      setAllow(data.result);
      setReqComing(true);
      if (data.result === false) {
        setReqComing(true);
        const text = `${data.hours} : ${data.minutes}`;
        setNextTime(text);
      }
    });
  }, [])

  return (
    <div className="border-2 border-gray-300 rounded-lg p-5 flex flex-col gap-y-10 lg:flex-row lg:justify-between lg:items-center w-full lg:px-4 bg-white shadow-md">
      <h1 className="font-[oswald] text-2xl text-center lg:text-3xl text-gray-800">
        Add Blood Request
      </h1>
      <p className="text-center text-gray-500 text-xl lg:text-2xl font-[oswald] drop-shadow-[0px_0px_12px_rgba(0,150,255,0.5)]">
        Delay Timer is {Delaytimer}
      </p>
      <button
        onClick={() => setMortal(true)}
        className="font-[oswald] text-2xl bg-red-600 text-white py-4 rounded-2xl lg:px-10 lg:py-2 lg:rounded-xl lg:font-semibold hover:bg-red-700 transition-all"
      >
        Add Request
      </button>

      {/* Modal */}
      <div
        ref={ref}
        className="hidden fixed top-0 left-0 w-full h-screen backdrop-blur-md bg-black/30 z-50"
      >
        <div className="border-2 w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-300 rounded-lg pt-20 px-5 pb-10 flex flex-col gap-y-10 lg:gap-y-5 bg-white shadow-2xl lg:justify-between lg:items-center lg:w-[40%] lg:px-4">
          <CgCloseR
            onClick={() => setMortal(false)}
            className="absolute top-5 right-5 text-5xl cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
          />
          {reqComing === false ? (
            <p className="text-gray-500 text-center animate-pulse text-xl font-[oswald]">
              We are preparing your form...
            </p>
          ) : allow === true ? (
            <>
              <form
                className="flex flex-col gap-y-5 w-full"
                onSubmit={handleSubmit(submitFrom)}
              >
                <select
                  id="selection"
                  {...register("bloodGroup", {
                    required: "Please select a blood group",
                    validate: (value) =>
                      value !== "default" ||
                      "Please select a valid blood group",
                  })}
                  className="bg-gray-100 w-full text-gray-800 text-xl font-Roboto py-4 px-4 rounded-lg border-2 border-gray-300 outline-none"
                >
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
                  <p className="text-red-500 text-xl font-Roboto">
                    Enter Valid Blood Group.
                  </p>
                )}
                {errors.number && (
                  <p className="text-red-500 text-xl font-Roboto">
                    {errors.number.type === "minLength"
                      ? "Phone number is required"
                      : "Number must be exactly 10 digits"}
                  </p>
                )}

                <input
                  id="number"
                  type="number"
                  placeholder="Enter Number"
                  {...register("number", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                  maxLength={10}
                  className="bg-gray-100 w-full text-gray-800 text-xl font-Roboto py-4 px-4 rounded-lg border-2 border-gray-300 outline-none tracking-widest"
                />
                <select
                  id="urgency"
                  {...register("urgency", {
                    required: "Please select the urgency level",
                    validate: (value) =>
                      value !== "default" || "Please select the urgency level",
                  })}
                  className="bg-gray-100 w-full text-gray-800 text-xl font-Roboto py-4 px-4 rounded-lg border-2 border-gray-300 outline-none"
                >
                  <option value="default">Select urgency</option>
                  <option value="high">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-400 text-white text-3xl font-[oswald] py-4 px-4 lg:px-10 lg:py-2 rounded-lg outline-none transition-all"
                >
                  Confirm
                </button>
              </form>
              <p className="text-amber-500 text-xl font-Roboto text-center">
                By clicking confirm, you agree to our terms and conditions.
                <br /> Thank you for your request! We will notify you when we
                find a match for you.
              </p>
            </>
          ) : (
            <p className="text-center text-red-500 text-2xl font-[oswald]">
              Wait {NextTime} Minutes for next Request.
            </p>
          )}
        </div>
      </div>
    </div>

  );
}

export default AddRequest