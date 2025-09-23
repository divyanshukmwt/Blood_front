import React, { useContext, useEffect } from 'react'
import { receiveMessage, sendMessage } from '../config/Socket';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';
import PdfDownloader from './PdfDownloader';
import { toast } from 'react-toastify';
const Stricks = ({ bloodGroup, date, time, status, id }) => {
  const { setUser } = useContext(UserContext);
  const navigator = useNavigate()
  const handelDelete = (id) => {
    sendMessage("delete-Post", id);
    toast.success("Delete successfully.")
  }
  useEffect(() => {
    receiveMessage("update-Post", async (data) => {
      await setUser(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="border-2 border-gray-300 bg-white rounded-lg shadow-md p-5 lg:p-4 flex flex-col gap-y-3 w-full lg:w-[32%] transition-all duration-200 hover:shadow-xl">
      <h3 className="text-2xl font-Poppins text-gray-800">
        RQ Type - <span className="text-red-500 font-semibold">{bloodGroup}</span>
      </h3>
      <p className="text-2xl font-Poppins text-gray-700">
        RQ Date - <span className="text-teal-600 font-medium">{date}</span>
      </p>
      <p className="text-2xl font-Poppins text-gray-700">
        RQ Time - <span className="text-teal-600 font-medium">{time}</span>
      </p>

      {status === "pending" ? (
        <button
          onClick={() => handelDelete(id)}
          className="w-full py-2 font-Roboto cursor-pointer uppercase text-xl font-semibold rounded bg-red-500 text-white 
                 hover:bg-red-600 transition-all duration-200"
        >
          Delete
        </button>
      ) : (
        <div className="flex gap-x-3">
          <button
            onClick={() => navigator(`/map/${id}`)}
            className="w-1/2 py-2 font-Roboto uppercase text-xl font-semibold rounded bg-blue-600 text-white 
                   hover:bg-blue-700 transition-all duration-200"
          >
            Map
          </button>
          <div className="w-1/2">
            <PdfDownloader id={id} className="w-full py-2 font-Roboto text-white uppercase text-xl font-semibold rounded bg-green-500  
                                          hover:bg-green-600 transition-all duration-200"/>
          </div>
        </div>
      )}
    </div>

  );
}

export default Stricks