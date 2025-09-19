import React, { useContext, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import { UserContext } from '../context/user.context';
import { AiFillCloseCircle } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";

import { receiveMessage, sendMessage } from '../config/Socket';
import { toast } from 'react-toastify';
const DonateForm = ({modal, modalfn, name, dataId}) => {
    const ref = useRef()
    const {user} = useContext(UserContext);
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  useEffect(()=>{
    if (!ref.current) return;

    if (modal === true) {
      ref.current.classList.add("block");
      ref.current.classList.remove("hidden");
    } else {
      ref.current.classList.remove("block");
      ref.current.classList.add("hidden");
    }
  },[modal])
  const onConfirm = (data)=>{
    try{
      const {postId, donarId, donarNumber } = data;
      sendMessage("accepted-request",{postId,donarId, donarNumber});
      modalfn(false);
      toast.success("🎉 Donate successfully.");
    }catch(err){
      toast.error("❌ Something went wrong!");
    }
  }
  return (
    <div
      ref={ref}
      className="hidden w-full h-screen fixed top-0 left-0 backdrop-blur-3xl z-50">
      <div className="w-[90%] lg:w-[50%] pt-20 pb-10 px-4 rounded-md bg-[#2a2a2a] text-white  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <AiFillCloseCircle
          onClick={() => modalfn(false)}
          className="absolute top-2 right-2 text-4xl"
        />
        <form
          onSubmit={handleSubmit(onConfirm)}
          className="flex flex-col items-center gap-y-5">
          <div className="flex flex-col lg:flex-row lg:gap-x-4 gap-y-3 items-center justify-center">
            <input {...register("postId")} type="hidden" value={dataId} />
            <input
              className="text-xl font-Roboto border-b-2 text-center outline-none"
              type="text"
              value={user.name}
              id=""
              readOnly
            />
            <input {...register("donarId")} type="hidden" value={user._id} />
            <FaHandshakeSimple className="text-4xl" />
            <input
              className="text-xl font-Roboto border-b-2 text-center outline-none"
              type="text"
              value={name}
              id=""
              readOnly
            />
          </div>
          <input
            {...register("donarNumber", {
              maxLength: {
                value: 10,
                message: "Number Must be 10 Digit",
              },
              minLength: {
                value: 10,
                message: "Number Must be 10 Digit",
              },
            })}
            type="number"
            placeholder="Enter Your Number..."
            id=""
            className="border-b-2 w-70 pb-2 focus:border-amber-500 text-center text-xl outline-none tracking-widest"
          />
          {errors.donarNumber && (
            <p className="text-[#FF3B30] font-Roboto">
              {errors.donarNumber.message}
            </p>
          )}
          <button
            className="my-5 font-Poppins text-xl tracking-wider transition-all duration-200 hover:-translate-y-2 bg-[#5BC0EB] rounded-md drop-shadow-xl/25 px-10 py-2"
            type="submit">
            <p className="drop-shadow-xl/50">Confirm</p>
          </button>
        </form>
        <p className="text-xl font-Poppins text-center text-[#FFB347] font-semibold">
          Once you click 'Confirm', you will not be able to decline the
          proposal.
        </p>
      </div>
    </div>
  );
}

export default DonateForm