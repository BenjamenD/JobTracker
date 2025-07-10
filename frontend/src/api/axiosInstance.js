import axios from 'axios';
import BASE_URL from '../config/config';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = `/login?redirect=${window.location.pathname}`;
    }
    return Promise.reject(err);
  }
);