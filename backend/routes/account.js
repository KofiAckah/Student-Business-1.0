import express from "express";

import { Register, Verify } from "./Sub-Routes/Register.js";
import { Login } from "./Sub-Routes/Login.js";
import {
  sendingOTP,
  verifyOTP,
  resetPassword,
} from "./Sub-Routes/ResetPassword.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from the backend!, main.js Home");
});

router.post("/register", Register);
router.post("/login", Login);
router.get("/verify/:token", Verify);
router.post("/send-otp-password", sendingOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;
