import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context";
import Axios from "../config/Axois";
import Loader from "../components/Loader";

const UserAuth = () => {
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    const fetchUser = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await Axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth failed:", error.message);
        localStorage.removeItem("userToken");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, setUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        <Loader size={200} center />
      </div>
    );
  }

  return <Outlet />;
};

export default UserAuth;
