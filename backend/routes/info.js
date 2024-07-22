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
import {
  SearchProduct,
  SearchByOnlyTitle,
  SearchByOnlyCategory,
  SearchByPriceRange,
  SearchByOnlyLocation,
  SearchByTitleAndCategory,
} from "./Sub-Routes/Search.js";
import { createComment, getComments } from "./Sub-Routes/Comment.controller.js";
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
router.put(
  "/update-profile",
  upload.single("image"),
  authMiddleware,
  UpdateProfile
);
router.get("/seller-products", authMiddleware, SellerProducts);
router.get("/view-product/:id", authMiddleware, ViewProduct);
router.put(
  "/edit-product/:id",
  upload.single("image"),
  // authMiddleware, //Need to add this line and fix the bugs
  EditProduct
);
router.delete("/delete-product/:id", authMiddleware, DeleteProduct);
router.get("/search-product", SearchProduct); // Done
router.get("/search-by-title", SearchByOnlyTitle); // Done
router.get("/search-by-location", SearchByOnlyLocation); // Done
router.get("/search-by-category", SearchByOnlyCategory); // Not Using
router.get("/search-by-price-range", SearchByPriceRange);
router.get("/search-by-categoryandtitle", SearchByTitleAndCategory); // Done
router.post("/create-comment/:id", authMiddleware, createComment);
router.get("/get-comments/:id", getComments);

export default router;
