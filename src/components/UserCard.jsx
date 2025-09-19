import React, { useContext } from 'react'
import {receiveMessage, sendMessage} from "../config/Socket";
import { AllUsersContext } from '../context/AllUsers.context';
import { toast } from 'react-toastify';
const UserCard = ({data}) => {
  const { setAllUsers } = useContext(AllUsersContext);
  const blockHandeler = (id)=>{
    sendMessage("blockUnblock-user", id);
    receiveMessage("Update-blockUser", (data)=>{
      setAllUsers(data)
    });
    toast.success("✅ Update change successfully.");
  }
  return (
    <div className="w-full py-5 px-4 flex flex-col gap-y-4 rounded-md border-2 text-white lg:w-100 lg:px-5 hover:-translate-y-2 transition-all duration-200">
      <div className="flex items-center gap-x-4">
        <div className="w-30 h-30 rounded-full overflow-hidden bg-[url('https://images.unsplash.com/photo-1544194215-541c2d3561a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-[-50px_10px]">
          <img
            className="w-full h-full object-cover"
            src={`data:${data.pictype};base64,${data.profilepic}`}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-Roboto font-semibold">{data.name}</h1>
          <h3 className="text-xs font-Poppins opacity-50">{data.email}</h3>
        </div>
      </div>
      {data.block === true ? (
        <button
          onClick={() => blockHandeler(data._id)}
          className="bg-linear-to-b rounded-md shadow-[0px_15px_30px_rgba(0,208,255,0.8)] from-10% from-transparent to-sky-400 text-2xl py-2 font-Roboto cursor-pointer">
          UnBlock User
        </button>
      ) : (
        <button
          onClick={() => blockHandeler(data._id)}
          className="bg-linear-to-b rounded-md shadow-[0px_15px_30px_rgba(255,0,0,0.8)] from-10% from-transparent to-red-400 text-2xl py-2 font-Roboto cursor-pointer">
          Block User
        </button>
      )}
    </div>
  );
}

export default UserCard