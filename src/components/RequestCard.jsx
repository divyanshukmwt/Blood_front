import React from 'react'
import { LiaUserClockSolid } from "react-icons/lia";
import { PiConfettiBold } from "react-icons/pi";
const RequestCard = ({data ,user}) => {
  return (
    <div className="w-full lg:w-[32%] flex flex-col gap-y-4 border-2 border-gray-600 rounded-lg p-5 bg-[#121212]">
      <div className="flex flex-col gap-y-1">
        <div className="w-20 aspect-square overflow-hidden rounded-full">
          <img
            src={`data:${user.pictype};base64,${user.profilepic}`}
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-Poppins text-2xl font-semibold">
          Name: <span className="text-[#FFD700]">{user.name}</span>
        </h1>
        <h1 className="font-Roboto text-xl">
          ID : <span className="text-[#A1A1AA]">{user._id}</span>
        </h1>
      </div>
      <h4 className="font-Roboto text-2xl">
        REQUEST : <span className="text-[#FF4C58]">{data.bloodType}</span>
      </h4>
      <h4 className="font-Roboto text-2xl">
        Date : <span className="text-[#3DE8E0]">{data.date}</span>
      </h4>
      <h4 className="font-Roboto text-2xl">
        Time : <span className="text-[#3DE8E0]">{data.time}</span>
      </h4>
      {data.status === "pending" ? (
        <button className="bg-orange-500 rounded-full cursor-no-drop py-4 font-Poppins text-2xl flex gap-x-2 items-center justify-center">
          <LiaUserClockSolid />
          Pending
        </button>
      ) : (
        <button className="bg-[#2fb682] py-4 rounded-full cursor-no-drop font-Poppins text-2xl flex gap-x-2 items-center justify-center">
          <PiConfettiBold />
          Accepted
        </button>
      )}
    </div>
  );
}

export default RequestCard