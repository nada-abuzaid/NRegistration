import axios from 'axios';

const { VITE_BASEURL } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: `${VITE_BASEURL}/api`,
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
