import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-hub-opvw.onrender.com" || "http://localhost:5000/api", 
});

// Add token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
