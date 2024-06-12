import express from "express";

import { Register, Verify } from "./Sub-Routes/Register.js";
import { Login, dashboard, Logout } from "./Sub-Routes/Login.js";
import {
  sendingOTP,
  verifyOTP,
  resetPassword,
} from "./Sub-Routes/ResetPassword.js";
import { PostProduct, GetProduct } from "./Sub-Routes/ProductRoutes.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send("Hello from the backend!, main.js Home");
});

router.post("/register", Register);
router.post("/login", Login);
router.get("/verify/:token", Verify);
router.post("/send-otp-password", sendingOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/dashboard", authMiddleware, dashboard);
router.get("/logout", Logout);
router.post(
  "/post-product",
  upload.single("image"),
  authMiddleware,
  PostProduct
);
router.get("/get-product", authMiddleware, GetProduct);

export default router;
