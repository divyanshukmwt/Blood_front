import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { CgCloseR } from "react-icons/cg";
import {receiveMessage, sendMessage} from "../config/Socket";
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

const AddRequest = ({time}) => {
  const [Mortal, setMortal] = useState(false);
  const [Delaytimer, setDelayTimer] = useState(timecalculator(time));
  const [Time, setTime] = useState("");
  const [date ,setDate] = useState("");
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

  const submitFrom = (data)=>{
    try{
      const { bloodGroup, number, urgency } = data;
      const fromHandeler = async ()=> {
      sendMessage("blood-request", { bloodGroup, number, date, Time, urgency });
      reset();
    }
    fromHandeler();
    setMortal(false);
    setReqComing(false);
    toast.success("🎉 Added successfully!");
    }catch(err){
        console.log(err);
    toast.error("❌ Something error!");
    }
  }
    useEffect(() => {
      if (!ref.current) return;

      if (Mortal === true && date && Time) {
        ref.current.classList.add("block");
        ref.current.classList.remove("hidden");
        sendMessage("seeAllowRequest", {date, Time});
      } else {
        ref.current.classList.remove("block");
        ref.current.classList.add("hidden");
      }
    }, [Mortal, date, Time]);

    useEffect(()=>{
      const localTime = moment().format("hh:mm A");
      const localDate = moment().format("DD/MM/YYYY");
      setDate(localDate);
      setTime(localTime);
      receiveMessage("delayTime",(data)=>{
      setDelayTimer(timecalculator(data))
      });
    },[])
  
  useEffect(() => {
    receiveMessage("allowingResult",(data)=>{
      setAllow(data.result);
      setReqComing(true);
      if(data.result === false){
        setReqComing(true);
        const text = `${data.hours} : ${data.minutes}`;
        setNextTime(text);
      }
    });
  }, [])

  return (
    <div className="border-2 border-gray-500 rounded-lg p-5 flex flex-col gap-y-10 lg:flex-row lg:justify-between lg:items-center w-full lg:px-4">
      <h1 className="font-Poppins text-5xl text-center lg:text-4xl">
        Add Blood Request
      </h1>
      <p className="text-center text-sky-400 text-xl lg:text-2xl font-Poppins drop-shadow-[0px_0px_15px_rgba(0,100,200,0.9)] ">
        Delay Timer is {Delaytimer}
      </p>
      <button
        onClick={() => setMortal(true)}
        className="font-OpenSans text-3xl bg-[#6A0DAD] py-4 rounded-2xl lg:px-10 lg:py-2 lg:rounded-xl lg:font-semibold">
        Add Request
      </button>
      <div
        ref={ref}
        className="hidden fixed top-0 left-0 w-full h-screen backdrop-blur-3xl z-50">
        <div className="border-2 w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-500 rounded-lg pt-25 px-5 pb-10 flex flex-col gap-y-10 lg:gap-y-5 bg-zinc-900 lg:justify-between lg:items-center lg:w-[40%] lg:px-4">
          <CgCloseR
            onClick={() => setMortal(false)}
            className="absolute top-5 right-5 text-5xl cursor-pointer z-50"
          />
          {reqComing === false ? (
            <p className="text-blue-500 text-center animate-pulse text-xl font-Poppins">
              We are prepairing your form...
            </p>
          ) : allow === true ? (
            <>
              <form
                className="flex flex-col gap-y-5 w-full"
                onSubmit={handleSubmit(submitFrom)}>
                <select
                  id="selection"
                  {...register("bloodGroup", {
                    required: "Please select a blood group",
                    validate: (value) =>
                      value !== "default" ||
                      "Please select a valid blood group",
                  })}
                  className="bg-zinc-800 w-full text-white text-xl font-Roboto py-4 px-4 rounded-lg border-2 border-gray-500 outline-none">
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
                    Enter Valid Blood Group.
                  </p>
                )}
                {errors.number && (
                  <p className="text-[#FF3B30] text-xl font-Roboto">
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
                  className="bg-zinc-800 w-full text-white text-xl font-Roboto py-4 px-4 rounded-lg border-2 border-gray-500 outline-none tracking-widest"
                />
                <select
                  id="urgency"
                  {...register("urgency", {
                    required: "Please select the urgency level",
                    validate: (value) =>
                      value !== "default" || "Please select the urgency level",
                  })}
                  className="bg-zinc-800 w-full text-white text-xl font-Roboto py-4 px-4 rounded-lg border-2 border-gray-500 outline-none">
                  <option value="default">Select urgency</option>
                  <option value="high">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#31beb7] text-white text-3xl font-Poppins py-4 px-4 lg:px-10 lg:py-2 rounded-lg outline-none">
                  Confirm
                </button>
              </form>
              <p className="text-[#FFB347] text-xl font-Roboto text-center">
                By clicking confirm, you agree to our terms and conditions.
                <br /> Thank you for your request! We will notify you when we
                find a match for you.
              </p>
            </>
          ) : (
            <p className="text-center text-red-400 text-2xl">
              Wait {NextTime} Minutes for next Request.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddRequest