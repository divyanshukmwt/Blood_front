import React, { useEffect, useRef } from 'react'
import { CgCloseR } from "react-icons/cg";
import { useForm } from "react-hook-form"
import AdminAxios from "../config/AdminAxios"
import { toast } from 'react-toastify';
const TicketForm = ({vari, fn}) => {
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const ref = useRef(null);
    useEffect(()=>{
        if(!ref.current) return;

        if (vari) {
          ref.current.classList.add("block");
          ref.current.classList.remove("hidden");
        } else {
          ref.current.classList.remove("block");
          ref.current.classList.add("hidden");
          document.querySelector(".ticket").value = "" ;
          document.querySelector(".desc").value = "";
        }
    },[vari])
    const onSubmit = async (data) => {
      const { ticketTitle, description } = data;
      try {
        await AdminAxios.post("/admin/ticket-maker", {
          ticketTitle,
          description,
        });
        fn(false);
        toast.success("👏🏽 Send successfully");
        document.querySelector(".ticket").value = "" ;
        document.querySelector(".desc").value = "";
      } catch (error) {
        toast.error("❌ Something went wrong!");
      }
    };
  return (
    <div
      ref={ref}
      className="hidden w-full h-screen fixed z-[99] top-0 left-0 backdrop-blur-3xl">
      <div className="absolute flex justify-center items-center bg-zinc-800 rounded-md pt-15 pb-5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] lg:w-[35%]">
        <CgCloseR
          onClick={() => fn(false)}
          className="absolute top-5 right-5 text-2xl"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[90%] gap-y-5">
          <div>
            <input
              {...register("ticketTitle", {
                required: "Ticket Title is required",
                minLength: {
                  value: 3,
                  message: "⚠️ Ticket Title must be at least 3 charecter!",
                },
                maxLength:{
                  value: 20,
                  message: "⚠️ Ticket Title must be in 20 charecter!",
                }
              })}
              type="text"
              placeholder="Title..."
              className="ticket px-2 font-Roboto py-2 block w-full bg-zinc-900 rounded-md border-2 border-zinc-900 focus:border-sky-400 outline-none "
            />
            {errors.ticketTitle && (
              <p className="text-[#FF3B30] font-Roboto">
                {errors.ticketTitle.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "⚠️ Description must be at least 10 charecters!",
                },
                maxLength: {
                  value: 250,
                  message: "⚠️ Description must be in 250 charecters!",
                },
              })}
              placeholder="Description..."
              className="desc px-2 font-Roboto py-2 resize-none block w-full h-40 bg-zinc-900 rounded-md border-2 border-zinc-900 focus:border-sky-400 outline-none "></textarea>
            {errors.description && (
              <p className="text-[#FF3B30] font-Roboto">
                {errors.description.message}
              </p>
            )}
          </div>
          <button
          type='submit'
          className="bg-sky-600 py-2 font-Poppins uppercase tracking-widest rounded-md">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketForm