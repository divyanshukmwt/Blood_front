import React from "react";
import { useNavigate } from "react-router-dom";
const DonarStricks = ({ bloodGroup, date, time, id }) => {
  const navigate = useNavigate();
  return (
    <div className="border-2 border-[#373737] bg-[#121212] rounded-lg p-5 lg:p-3 flex flex-col gap-y-2 w-full lg:w-[32%]">
      <h3 className="text-2xl font-Poppins">
        RQ Type - <span className="text-[#FF6B6B]">{bloodGroup}</span>
      </h3>
      <p className="text-2xl font-Poppins">
        RQ Date - <span className="text-[#3DE8E0]">{date}</span>
      </p>
      <p className="text-2xl font-Poppins">
        RQ Time - <span className="text-[#3DE8E0]">{time}</span>
      </p>
      <button
        onClick={() => navigate(`/map/${id}`)}
        className="w-full py-2 font-Roboto uppercase text-xl font-semibold rounded bg-[#374785] cursor-pointer hover:bg-[#374785]/70 transition-all duration-200">
        Map
      </button>
    </div>
  );
};

export default DonarStricks;
