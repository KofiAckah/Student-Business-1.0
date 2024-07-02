import express from "express";

import path from "path";
import multer from "multer";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes
import {
  GetSeller,
  GetProfile,
  UpdateProfile,
  SellerProducts,
  ViewProduct,
  EditProduct,
  DeleteProduct,
} from "./Sub-Routes/Profile.js";
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
  res.send("Hello from the backend!, info.js Home");
});

router.get("/get-seller/:id", authMiddleware, GetSeller);
router.get("/get-profile", authMiddleware, GetProfile);
router.put("/update-profile", authMiddleware, UpdateProfile);
router.get("/seller-products", authMiddleware, SellerProducts);
router.get("/view-product/:id", authMiddleware, ViewProduct);
router.put(
  "/edit-product/:id",
  upload.single("image"),
  // authMiddleware, //Need to add this line and fix the bugs
  EditProduct
);
router.delete("/delete-product/:id", authMiddleware, DeleteProduct);

export default router;
