import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/admin.context";
import { CiNoWaitingSign } from "react-icons/ci";

const Maintanence = () => {
  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.serverOnOff === false) {
      const lastRoute = localStorage.getItem("lastValidRoute") || "/";
      navigate(lastRoute);
      localStorage.removeItem("lastValidRoute");
    }
  }, [admin?.serverOnOff, navigate]);

  return (
    <div className="h-screen flex w-full items-center gap-x-5 justify-center bg-black text-white">
      <h1 className="flex flex-col lg:flex-row py-4 lg:justify-center lg:gap-x-5 font-Roboto gap-y-10 items-center bg-black drop-shadow-[0_0px_50px_rgba(255,0,0,0.45)] w-full text-center px-4 text-4xl">
        <CiNoWaitingSign className="text-[#FF3B30] text-8xl lg:text-6xl animate-rotate-clock-wise" />
        Website is under Maintenance. Please come back later.
        <CiNoWaitingSign className="text-[#FF3B30] text-8xl lg:text-6xl animate-rotate-clock-wise" />
      </h1>
    </div>
  );
};

export default Maintanence;
