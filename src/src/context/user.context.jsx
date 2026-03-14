import { createContext, useState, useEffect } from "react";
import Axios from "../config/Axois";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("userToken") || localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await Axios.get("/users/profile");
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Failed to restore user from token:", err);
      }
    };
    init();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
