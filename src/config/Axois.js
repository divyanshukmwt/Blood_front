import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config)=>{
  const userToken = localStorage.getItem("userToken");
  if(userToken){
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  // also support legacy 'token' key
  const legacy = localStorage.getItem('token');
  if(legacy && !config.headers.Authorization){
    config.headers.Authorization = `Bearer ${legacy}`;
  }
  return config;
})

export default axiosInstance;
