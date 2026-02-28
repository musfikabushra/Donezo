import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://task-api-eight-flax.vercel.app",
});

// automatically attach bearer token if present in localStorage

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "demo-token") {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
