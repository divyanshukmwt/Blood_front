import React, { useContext, useEffect } from 'react'
import { receiveMessage, sendMessage } from '../config/Socket';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';
import PdfDownloader from './PdfDownloader';
import { toast } from 'react-toastify';
const Stricks = ({bloodGroup, date, time, status, id}) => {
  const {setUser} = useContext(UserContext);
  const navigator = useNavigate()
  const handelDelete = (id)=>{
    sendMessage("delete-Post",id);
    toast.success("Delete successfully.")
  }
  useEffect(() => {
    receiveMessage("update-Post", async (data) => {
      await setUser(data);
      console.log(data);
    });
  }, []);

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
      {status === "pending" ? (
        <button
          onClick={() => {
            handelDelete(id);
          }}
          className="w-full py-2 font-Roboto cursor-pointer  uppercase text-xl font-semibold rounded bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 transition-all duration-200">
          Delete
        </button>
      ) : (
        <div className="flex gap-x-2">
          <button
            onClick={() => navigator(`/map/${id}`)}
            className="w-full py-2 font-Roboto uppercase text-xl font-semibold rounded bg-[#374785] cursor-pointer hover:bg-[#374785]/70 transition-all duration-200">
            Map
          </button>
          <PdfDownloader id={id} />
        </div>
      )}
    </div>
  );
}

export default Stricks