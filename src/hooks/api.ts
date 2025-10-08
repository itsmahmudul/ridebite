import axios, { AxiosInstance } from "axios";

// Create an axios instance with proper typing
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;