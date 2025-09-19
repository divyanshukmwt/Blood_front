import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

export default axiosInstance;
