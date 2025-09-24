import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminAxios from "../config/AdminAxios";
import { AdminContext } from "../context/admin.context";
import Loader2 from "../components/Loader2"; // ⬅️ import the loader

const AdminAuth = () => {
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    const fetchAdmin = async () => {
      if (!adminToken) {
        navigate("/admin/login");
        return;
      }

      try {
        const res = await AdminAxios.get("/admin/admin-profile", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setAdmin(res.data.user);
        setIsAdminLoading(false);
      } catch (err) {
        console.log("Admin auth failed:", err.message);
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    };

    fetchAdmin();
  }, [navigate, setAdmin]);

  if (isAdminLoading) {
    return <Loader2 />; // ⬅️ show the loader here
  }

  return <Outlet />;
};

export default AdminAuth;
