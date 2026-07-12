// src/lib/adminApi.js
import axios from "axios";

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/admin`,
  withCredentials: true, // sends the httpOnly admin_token cookie automatically
});

export default adminApi;