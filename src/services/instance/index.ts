import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 36000,
  headers: {
    'Content-Type': 'application/json'
  }
});
