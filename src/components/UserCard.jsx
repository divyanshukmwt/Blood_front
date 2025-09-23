import React, { useContext } from 'react'
import { receiveMessage, sendMessage } from "../config/Socket";
import { AllUsersContext } from '../context/AllUsers.context';
import { toast } from 'react-toastify';
const UserCard = ({ data }) => {
  const { setAllUsers } = useContext(AllUsersContext);
  const blockHandeler = (id) => {
    sendMessage("blockUnblock-user", id);
    receiveMessage("Update-blockUser", (data) => {
      setAllUsers(data)
    });
    toast.success("✅ Update change successfully.");
  }
  return (
    <div className="w-full py-5 px-4 flex flex-col gap-y-4 rounded-md border-2 text-white lg:w-100 lg:px-5 hover:-translate-y-2 transition-all duration-200">
      <div className="flex items-center gap-x-4">
        <div
          className="w-30 h-30 rounded-full overflow-hidden 
             bg-[url('https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png')] 
             bg-cover bg-no-repeat bg-center"
        >
          <img
            className="w-full h-full object-cover"
            src={`data:${data.pictype};base64,${data.profilepic}`}
            alt=""
          />
        </div>

        <div className="flex flex-col text-black items-center">
          <h1 className="text-xl font-Roboto font-semibold">{data.name}</h1>
          <h3 className="text-xs font-Poppins opacity-50">{data.email}</h3>
        </div>
      </div>
      {data.block === true ? (
        <button
          onClick={() => blockHandeler(data._id)}
          className="bg-blue-500 text-white py-2 px-4 rounded font-Poppins hover:bg-blue-600 transition-colors duration-200"
        >
          Unblock User
        </button>
      ) : (
        <button
          onClick={() => blockHandeler(data._id)}
          className="bg-red-500 text-white py-2 px-4 rounded font-Poppins hover:bg-red-600 transition-colors duration-200"
        >
          Block User
        </button>
      )}

    </div>
  );
}

export default UserCard