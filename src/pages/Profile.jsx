import { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../utils/Navbar'
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import Scales from '../components/Scales';
import AddRequest from '../components/AddRequest';
import Stricks from '../components/Stricks';
import { UserContext } from '../context/user.context';
import UploadForm from '../components/UploadForm';
import { receiveMessage } from '../config/Socket';
import BlockInterface from '../components/BlockInterface';
import { MdVerified } from "react-icons/md";
import DonarStricks from '../components/DonarStricks';
import Form from "../components/Form"
import Animate from '../components/Animate';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userDets, setUserDets] = useState(user);
  const [picModal, setPicModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const animateRef = useRef();

  useEffect(() => {
    receiveMessage("allPost", (data) => {
      setUser(data);
      setUserDets(data)
    })

    receiveMessage("reciver-update", (data) => {
      setUser(data)
      setUserDets(data)
    });

    receiveMessage("updateBlock-center", (data) => {
      setUser(data)
      setUserDets(data)
    });

  }, [])

  useEffect(() => {
    setUserDets(user)
  }, [user])

  useEffect(() => {
    if (userDets?.number === null) {
      setFormModal(true);
    }
  }, [userDets?.number]);
  return (
    <Animate ref={animateRef}>
      {formModal && <Form fn={setFormModal} />}
      <div className="bg-gray-100 w-full h-fit text-black">
        {/* Navbar */}
        <Navbar
          field={[
            { link: "/", name: "Home" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/reciver/blood", name: "Blood" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
            { link: "/login", name: "Logout" },
          ]}
        />

        {/* Profile Section */}
        <div className="flex flex-col pt-20 gap-y-7 items-center lg:flex-row lg:justify-center lg:gap-x-70">
          {picModal && <UploadForm fn={setPicModal} email={userDets.email} />}
          <div className="flex flex-col items-center">
            <div className="w-62 h-62 rounded-full relative flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544194215-541c2d3561a4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-[-75px_10px]">
              {userDets?.profilepic && userDets?.pictype && (
                <img
                  src={`data:${userDets.pictype};base64,${userDets.profilepic}`}
                  alt="Profile"
                  className="w-62 h-62 rounded-full object-cover"
                />
              )}
              <PiGooglePhotosLogoFill
                onClick={() => {
                  setPicModal(!picModal);
                }}
                className="absolute z-20 text-white bg-gray-800 text-7xl bottom-0 right-0 rounded-full p-2 cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-[oswald]">
                {userDets.name != undefined ? userDets.name : <span>Loading...</span>}
              </h3>
              <p className="text-gray-500 font-[oswald] text-xl">{userDets.email}</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="border-2 border-gray-300 rounded-lg p-5 flex flex-col gap-y-1 ml-5 mr-5 lg:w-1/3 bg-white">
            <h3 className="text-3xl font-[oswald]">Hey, Welcome</h3>
            <span className="text-3xl font-[oswald]">{userDets.name}</span>
            <p className="font-[oswald] text-2xl pt-5">
              Welcome to <span className='text-red-600'>Red Hope</span>
              <br /> Thank you for saving lives. Every action counts. Together, we
              build a stronger India. You’re a hero. Stay inspired!
            </p>
          </div>
        </div>

        {/* Streaks Info */}
        <div className="flex flex-col gap-y-5 gap-x-10 items-start mt-10 mb-2 border-2 border-gray-300 rounded-lg p-5 mx-5 bg-white">
          <h1 className="font-[oswald] text-3xl">Your Streaks Info</h1>
          <div className="flex flex-col gap-y-5 lg:flex-row lg:justify-between lg:w-full lg:px-4">
            <Scales
              text={"Donate"}
              count={userDets.Donate.length}
              para={userDets.Donate.length > 1 ? "Times" : "Time"}
              className="font-[oswald]"
            />
            <Scales
              text={"Blood Requests"}
              count={userDets.bloodRequest.length}
              para={userDets.bloodRequest.length > 1 ? "Times" : "Time"}
              className="font-[oswald]"
            />

            <div className="flex flex-col items-start gap-y-3">
              <h3 className="text-3xl font-[oswald]">Verified</h3>
              {userDets.verified && (
                <p className="text-3xl font-Poppins flex items-center justify-center gap-x-2 ">
                  <MdVerified className="text-blue-500" />
                  <span className="font-[oswald] text-4xl"> Yes</span>
                </p>
              )}
            </div>
            <div className="flex flex-col items-start lg:items-center gap-y-3">
              <h3 className="text-3xl font-[oswald]">Blood Group</h3>
              <p className="text-3xl font-[oswald] flex gap-x-2 font-bold text-red-500">
                {userDets.bloodgroup}
              </p>
            </div>
          </div>
        </div>

        {/* Add Request / Block */}
        <div className="px-5 py-2 flex justify-center">
          {userDets.block === true ? (
            <BlockInterface />
          ) : (
            <AddRequest time={userDets.delayTime} />
          )}
        </div>

        {/* All Requests */}
        <div className="px-5 py-2">
          <div className="border-2 border-gray-300 rounded-lg p-5 flex flex-col gap-y-5 bg-white">
            <h1 className="font-[oswald] text-3xl">Your All Request</h1>
            <div
              id="scroller"
              className={`min-h-10 max-h-96 w-full ${userDets.block === true
                ? "opacity-20 pointer-events-none"
                : "opacity-100 pointer-events-auto"
                } p-2 border-2 border-gray-300 rounded-lg overflow-y-auto flex flex-col gap-y-5 lg:gap-y-2 lg:gap-x-2 lg:flex-row lg:flex-wrap`}
            >
              {userDets?.bloodRequest.length !== 0 ? (
                [...(userDets?.bloodRequest || [])]
                  .filter((item) => item?.date && item?.time)
                  .sort((a, b) => {
                    const getDateTime = (item) =>
                      new Date(
                        `${item.date.split("/").reverse().join("-")} ${item.time}`
                      );
                    return getDateTime(b) - getDateTime(a);
                  })
                  .map((item, index) => (
                    <Stricks
                      key={index}
                      bloodGroup={item.bloodType}
                      date={item.date}
                      time={item.time}
                      status={item.status}
                      id={item._id}
                    />
                  ))
              ) : (
                <p className="text-center w-full uppercase font-Poppins font-semibold text-gray-500">
                  No Request Yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* All Donations */}
        <div className="px-5 py-2">
          <div className="border-2 border-gray-300 rounded-lg p-5 flex flex-col gap-y-5 bg-white">
            <h1 className="font-[oswald] text-3xl">Your All Donation</h1>
            <div
              id="scroller"
              className={`min-h-10 max-h-96 w-full ${userDets.block === true
                ? "opacity-20 pointer-events-none"
                : "opacity-100 pointer-events-auto"
                } p-2 border-2 border-gray-300 rounded-lg overflow-y-auto flex flex-col gap-y-5 lg:gap-y-2 lg:gap-x-2 lg:flex-row lg:flex-wrap`}
            >
              {userDets?.Donate.length !== 0 ? (
                [...(userDets?.Donate || [])]
                  .filter((item) => item?.date && item?.time)
                  .sort((a, b) => {
                    const getDateTime = (item) =>
                      new Date(
                        `${item.date.split("/").reverse().join("-")} ${item.time}`
                      );
                    return getDateTime(b) - getDateTime(a);
                  })
                  .map((item, index) => (
                    <DonarStricks
                      key={index}
                      bloodGroup={item.bloodType}
                      date={item.date}
                      time={item.time}
                      id={item._id}
                    />
                  ))
              ) : (
                <p className="text-center w-full uppercase font-Poppins font-semibold text-gray-500">
                  No Donation Yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default Profile
