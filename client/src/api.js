import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change if needed
});

// Add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // ✅ Proper format
  }
  return req;
});

export default API;
