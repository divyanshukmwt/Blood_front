import React from 'react'
import { LiaUserClockSolid } from "react-icons/lia";
import { PiConfettiBold } from "react-icons/pi";
const RequestCard = ({ data, user }) => {
  return (
    <div className="w-full lg:w-[32%] flex flex-col gap-y-4 border-2 border-gray-300 rounded-lg p-5 bg-white text-black shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col gap-y-1">
        <div className="w-20 aspect-square overflow-hidden rounded-full border-2 border-gray-300">
          <img
            src={`data:${user.pictype};base64,${user.profilepic}`}
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-Poppins text-2xl font-semibold">
          Name: <span className="text-yellow-600">{user.name}</span>
        </h1>
        <h1 className="font-Roboto text-xl">
          ID: <span className="text-gray-500">{user._id}</span>
        </h1>
      </div>
      <h4 className="font-Roboto text-2xl">
        REQUEST: <span className="text-red-500">{data.bloodType}</span>
      </h4>
      <h4 className="font-Roboto text-2xl">
        Date: <span className="text-sky-500">{data.date}</span>
      </h4>
      <h4 className="font-Roboto text-2xl">
        Time: <span className="text-sky-500">{data.time}</span>
      </h4>

      {data.status === "pending" ? (
        <button className="bg-orange-400 rounded-full py-4 font-Poppins text-2xl flex gap-x-2 items-center justify-center cursor-not-allowed hover:bg-orange-500 transition-colors duration-200">
          <LiaUserClockSolid />
          Pending
        </button>
      ) : (
        <button className="bg-green-500 py-4 rounded-full font-Poppins text-2xl flex gap-x-2 items-center justify-center cursor-not-allowed hover:bg-green-600 transition-colors duration-200">
          <PiConfettiBold />
          Accepted
        </button>
      )}
    </div>

  );
}

export default RequestCard