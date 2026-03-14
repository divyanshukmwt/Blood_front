import React, { useEffect } from "react";
import AllRouter from "./Routes/Router";
import { initializeSocket } from "./config/Socket";
import TostContainer from "./components/TostContainer";

const App = () => {
  useEffect(() => {
    initializeSocket();
  }, []);

  return (
    <React.Fragment>
      <AllRouter />
      <TostContainer />
    </React.Fragment>
  );
};

export default App;
