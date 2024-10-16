import axios from 'axios';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((config) => {
 
  if (!config.response==200) {
    toast.error("unauthorized access user axios module")
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;