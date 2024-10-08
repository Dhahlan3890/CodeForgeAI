// axiosInstance.js

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;


const axiosInstance = axios.create({
  baseURL: apiUrl,  // Adjust base URL as per your Django backend
  timeout: 5000,  // Adjust timeout as needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);

  // Access the access token
    const token = tokens.access;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
