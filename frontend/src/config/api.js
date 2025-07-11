// Frontend API configuration
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://event-master-demo.vercel.app/api"
    : "http://localhost:5000/api";

export default API_BASE_URL;
