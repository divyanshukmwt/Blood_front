import { createContext, useState } from "react";

export const DonarContext = createContext([]);

export const DonarProvider = ({ children }) => {
  const [DonatePost, setDonatePost] = useState([]);
  return (
    <DonarContext.Provider value={{ DonatePost, setDonatePost }}>
      {children}
    </DonarContext.Provider>
  );
};