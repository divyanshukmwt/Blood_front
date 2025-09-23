import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../utils/Navbar";
import RequestCard from "../components/RequestCard";
import { UserContext } from "../context/user.context";
import { CiNoWaitingSign } from "react-icons/ci";

const Blood = () => {
  const { user } = useContext(UserContext);
  const [filterData, setFilterData] = useState("allRequest");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (user?.bloodRequest?.length) {
      const filtered = user.bloodRequest.filter((item) => {
        if (filterData === "allRequest") return true;
        return item.status === filterData;
      });

      const sorted = filtered.sort((a, b) => {
        const getDateTime = (item) =>
          new Date(`${item.date.split("/").reverse().join("-")} ${item.time}`);
        return getDateTime(b) - getDateTime(a);
      });

      setFilteredPosts(sorted);
    } else {
      setFilteredPosts([]);
    }
  }, [filterData, user?.bloodRequest]);

  return (
      <div className="w-full min-h-screen bg-white text-black pt-20 pb-4">
        <Navbar
          field={[
            { link: "/users/profile", name: "Profile" },
            { link: "/", name: "Home" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
          ]}
        />

        {/* Filter Dropdown */}
        <div className="fixed w-1/2 lg:w-1/4 p-2 border-2 bg-white text-black top-20 right-5 z-30">
          <select
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="w-full p-2 bg-white text-black outline-none rounded-md border border-gray-300"
          >
            <option value="allRequest">All Request</option>
            <option value="pending">Pending</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        {/* Requests Grid */}
        <div className="px-5 flex flex-col gap-y-4 lg:flex-row gap-x-4 flex-wrap">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item, index) => (
              <RequestCard key={index} user={user} data={item} lightTheme />
            ))
          ) : (
            <p className="text-xl flex gap-x-2 items-center text-red-500">
              <CiNoWaitingSign className="text-2xl" />
              No Request Found!
            </p>
          )}
        </div>
      </div>

  );
};

export default Blood;
