import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminContext } from "../context/admin.context";
import { receiveMessage } from "../config/Socket";

const ProtectedRoute = () => {
  const { admin, setAdmin } = useContext(AdminContext);
  const location = useLocation();
  const [serverStatus, setServerStatus] = useState(admin?.serverOnOff);

  useEffect(() => {
    receiveMessage("server-res", (data) => {
      setServerStatus(data.serverOnOff);
      setAdmin(data);
    });
  }, [setAdmin]);

  useEffect(() => {
    if (!serverStatus) {
      localStorage.setItem("lastValidRoute", location.pathname);
    }
  }, [serverStatus, location.pathname]);

  if (serverStatus) {
    return <Navigate to="/maintanence" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
