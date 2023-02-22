import axios from "axios";

const apiBaseUrl = "https://apiar.safeweb.com.br/passwordapi/api/vendasportal/"

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 36000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
