import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../utils/Navbar";
import RequestCard from "../components/RequestCard";
import { UserContext } from "../context/user.context";
import { CiNoWaitingSign } from "react-icons/ci";
import Animate from "../components/Animate";

const Blood = () => {
  const animateRef = useRef();
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
    <Animate ref={animateRef}>
      <div className="w-full min-h-screen bg-[#000] text-white pt-20 pb-4">
        <Navbar
          animateRef={animateRef}
          field={[
            { link: "/users/profile", name: "Profile" },
            { link: "/", name: "Home" },
            { link: "/donate/request-list", name: "Donate" },
            { link: "/about", name: "About" },
            { link: "/users/contactUs", name: "Contact Us" },
          ]}
        />

        <div className="fixed w-1/2 lg:w-1/4 p-2 border-2 bg-black text-white top-20 right-5 z-30">
          <select
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="w-full p-2 bg-black text-white outline-none rounded-md">
            <option value="allRequest">All Request</option>
            <option value="pending">Pending</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <div className="px-5 flex flex-col gap-y-4 lg:flex-row gap-x-4 flex-wrap">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item, index) => (
              <RequestCard key={index} user={user} data={item} />
            ))
          ) : (
            <p className="text-xl flex gap-x-2 items-center">
              <CiNoWaitingSign className="text-2xl text-[#FF3B30]" />
              No Request Found!
            </p>
          )}
        </div>
      </div>
    </Animate>
  );
};

export default Blood;
