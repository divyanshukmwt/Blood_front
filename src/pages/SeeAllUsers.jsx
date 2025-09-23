import React, { useContext, useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import UserCard from "../components/UserCard";
import AdminAxios from "../config/AdminAxios";
import { AllUsersContext } from "../context/AllUsers.context";

const SeeAllUsers = () => {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const [allUser, setUser] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await AdminAxios.post("/admin/seeAllUser");
        setAllUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setUser(allUsers);
  }, [allUsers]);

  const filteredUsers = allUser.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div className="w-full min-h-screen bg-gray-50 text-gray-900 font-Poppins">
  {/* Navbar */}
  <Navbar
    field={[
      { link: "/admin", name: "Profile" },
      { link: "/", name: "Home" },
      { link: "/donate/request-list", name: "Donate" },
      { link: "/reciver/blood", name: "Blood" },
      { link: "/about", name: "About" },
    ]}
  />

  <div className="pt-40 pb-4 w-full min-h-screen px-5 lg:px-14">
    {/* Search Input */}
    <div className="bg-white fixed top-20 left-1/2 lg:left-10 -translate-x-1/2 lg:-translate-x-0 w-[90%] lg:w-[35rem] rounded-xl shadow-lg border border-red-700">
      <input
        maxLength={40}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type Name or Email..."
        className="px-4 py-3 lg:py-2 w-full outline-none text-gray-900 font-Poppins placeholder-zinc-400 focus:border-b-2 border-red-700 rounded-xl transition-all duration-200"
      />
    </div>

    {/* Users Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mt-36 lg:mt-20">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col items-center gap-y-3 border border-red-100"
          >
            <UserCard data={item} />
          </div>
        ))
      ) : (
        <p className="text-center w-full text-zinc-500 mt-10 text-lg">
          No users found.
        </p>
      )}
    </div>
  </div>
</div>


  );
};

export default SeeAllUsers;
