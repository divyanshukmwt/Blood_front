import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { receiveMessage } from "../config/Socket";
import { AdminContext } from "../context/admin.context";

const ServerGate = ({ children }) => {
  const navigate = useNavigate();
  const { admin, setAdmin } = useContext(AdminContext);

  useEffect(() => {
    receiveMessage("server-status", (status) => {
      setAdmin((prev) => ({ ...prev, serverOnOff: status }));
      if (!status) {
        navigate("/maintanence");
      }
    });
  }, [navigate, setAdmin]);

  useEffect(() => {
    if (admin?.serverOnOff === false) {
      navigate("/maintanence");
    }
  }, [admin?.serverOnOff, navigate]);

  return <>{children}</>;
};

export default ServerGate;
