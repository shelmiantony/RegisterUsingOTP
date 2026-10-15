import express from "express";
import { register, generateOtp, verifyOtp } from "../controller/auth.js";
const router = express.Router();

//register

router.post("/register", register);
//generate otp

router.post("/generate-otp", generateOtp);

//verify otp

router.post("/verify-otp", verifyOtp);

export default router;
