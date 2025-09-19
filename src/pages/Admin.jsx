import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../utils/Navbar'
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import AdminProfilePic from "../components/AdminProfilePic"
import Scales from '../components/Scales';
import Button from '../components/Button';
import { AdminContext } from '../context/admin.context';
import AdminAxios from "../config/AdminAxios"
import { receiveMessage, sendMessage } from '../config/Socket';
import SelectBox from '../components/SelectBox';
const Admin = () => {
    const [picModal, setPicModal] = useState(false);
    const { admin, setAdmin } = useContext(AdminContext);
    const [adminDets, setAdminDets] = useState(admin);
    const [ counts , setCounts ] = useState({})
    const [ time, setTime]= useState("")

    useEffect(()=>{
      setAdminDets(admin)
    },[admin])

    useEffect(() => {
      const fetchCounts = async () => {
        try {
          const res = await AdminAxios.post("/admin/allcounts");
          setCounts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCounts();
    }, []);
    
      const serverHandel = () => {
        sendMessage("server-req", adminDets.email);
      }
      useEffect(() => {
        receiveMessage("server-res", (data) => {
          setAdmin(data);
          setAdminDets(data);
        });

      }, []);
      useEffect(()=>{
        const timecalculator = () => {
          if(admin.delayTimer == 60) return "60s";
          else if (admin.delayTimer == 120) return "2min"
          else if (admin.delayTimer == 300) return "5min"
          else if (admin.delayTimer == 600) return "10min"
          else if (admin.delayTimer == 1800) return "30min"
          else if (admin.delayTimer == 3600) return "1hr"
        }
        setTime(timecalculator());
      },[admin.delayTimer])
  return (
    <div className="w-full min-h-screen bg-black">
      <Navbar
        field={[
          { link: "/", name: "Home" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
          { link: "/adminLogout", name: "Logout" },
        ]}
      />
      <div className="pt-20 text-white px-6 lg:px-10 pb-5 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-5 items-center w-full">
          {picModal && (
            <AdminProfilePic fn={setPicModal} email={adminDets.email} />
          )}
          <div className="w-60 h-60 relative rounded-full">
            <img
              className="w-60 h-60 rounded-full object-cover"
              src={`data:${adminDets.pictype};base64,${adminDets.profilepic}`}
              alt=""
            />
            <PiGooglePhotosLogoFill
              onClick={() => {
                setPicModal(!picModal);
              }}
              className="absolute z-20 text-white bg-zinc-800 text-7xl bottom-0 right-0 rounded-full p-2 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-Roboto text-3xl">{admin.name}</h1>
          <h1 className="font-Poppins text-xl text-zinc-400 opacity-70">
            {admin.email}
          </h1>
        </div>
        <button
          onClick={() => serverHandel()}
          className="bg-[#0f172a] cursor-pointer w-fit text-white px-6 py-3 rounded-md font-Roboto font-semibold text-2xl hover:bg-[#0f172a]/90 transition-all duration-300">
          Server Switch :{" "}
          {adminDets.serverOnOff === true ? (
            <span className="text-green-400">ON</span>
          ) : (
            <span className="text-[#FF3B30]">OFF</span>
          )}
        </button>
        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
          <div className="border-2 w-full py-5 rounded-md px-4 flex flex-col gap-y-6">
            {counts && (
              <Scales
                text={"User Count"}
                count={counts.UserCount}
                para={counts.UserCount > 1 ? "Users" : "User"}
                center={false}
              />
            )}
            {counts && (
              <Scales
                text={"Request Count"}
                count={counts.requestCount}
                para={counts.requestCount > 1 ? "Times" : "Time"}
                center={false}
              />
            )}
            {counts && (
              <Scales
                text={"Ticket Raises"}
                count={counts.ticketCounst}
                para={counts.ticketCounst > 1 ? "Times" : "Time"}
                center={false}
              />
            )}
            <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4">
              <Button text={"See All Users"} navigating={"/allUsers"} />
              <Button text={"Ticket Raise"} navigating={"/ticket-raiser"} />
            </div>
          </div>
          <div className="w-full py-10 px-4 pb-80 lg:pb-0 border-2 rounded-md flex flex-col gap-y-10 relative">
            <h1 className="font-Poppins text-2xl">
              Set Delay Timer of the Request.
            </h1>
            <p className="absolute bottom-7 right-3 lg:left-52 sm:left-46 sm:text-xl font-Roboto text-lg text-sky-500">
              DelayTimer Set in {time}
            </p>
            <SelectBox
              option={["60s", "2min", "5min", "10min", "30min", "1hr"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin