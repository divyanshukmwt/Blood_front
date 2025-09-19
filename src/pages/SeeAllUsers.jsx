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
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar
        field={[
          { link: "/admin", name: "Profile" },
          { link: "/", name: "Home" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
        ]}
      />
      <div className="pt-40 pb-4 w-full min-h-screen px-5 lg:px-15">
        <div className="bg-zinc-900 fixed top-20 left-1/2 lg:left-10 lg:-translate-x-0 -translate-x-1/2 w-[90%] lg:w-90">
          <input
            maxLength={40}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // <== NEW
            placeholder="Type Name... Or Email..."
            className="px-4 py-3 lg:py-2 focus:border-b-2 border-zinc-500 font-Roboto inline-block w-full outline-none text-xl"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mt-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item, index) => (
              <UserCard data={item} key={index} />
            ))
          ) : (
            <p className="text-center w-full text-zinc-400 mt-10">
              No users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeAllUsers;
