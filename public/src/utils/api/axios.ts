import axios from 'axios';
import { BASE_URL } from '../../constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    return newConfig;
  },
  (error) => Promise.reject(error.response.data)
);

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error.response.data)
);

export default axiosInstance;
