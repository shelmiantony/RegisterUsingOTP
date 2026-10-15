import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/auth" });
export const registerUser = (data) => API.post("/register", data);
export const generateOtp = (data) => API.post("/generate-otp", data);
export const verifyOtp = (data) => API.post("/verify-otp", data);
