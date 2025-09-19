import React, { useEffect, useState } from "react";
import AllRouter from "./Routes/Router";
import { initializeSocket } from "./config/Socket";
import Loder from "./components/Loder";
import { AnimatePresence } from "framer-motion";
import TostContainer from "./components/TostContainer";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeSocket();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        {loading && <Loder key="loader" />}
      </AnimatePresence>
      {!loading && <AllRouter />}
      <TostContainer />
    </React.Fragment>
  );
};

export default App;
