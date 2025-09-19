import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config)=>{
  const userToken = localStorage.getItem("userToken");
  if(userToken){
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
})

export default axiosInstance;
