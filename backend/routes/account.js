import express from "express";

import path from "path";
import multer from "multer";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes
import { Register, Verify } from "./Sub-Routes/Register.js";
import { Login, dashboard, Logout } from "./Sub-Routes/Login.js";
import {
  sendingOTP,
  verifyOTP,
  resetPassword,
} from "./Sub-Routes/ResetPassword.js";
import {
  PostProduct,
  GetProduct,
  GetProductId,
} from "./Sub-Routes/ProductRoutes.js";
import { GetUser } from "./Sub-Routes/Profile.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "../frontend/src/assets/Images/");
  // },
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
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

// account
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
router.get("/get-product", GetProduct);
router.get("/get-product/:id", authMiddleware, GetProductId);

export default router;
