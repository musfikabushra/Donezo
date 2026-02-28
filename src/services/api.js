import axios from "axios";

// create an axios instance with a base URL (can be configured via environment variable)
// default to the provided task API if no env var is set
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://task-api-eight-flax.vercel.app",
});

// automatically attach bearer token if present in localStorage
// but skip the fake demo token so public endpoints still work
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "demo-token") {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
