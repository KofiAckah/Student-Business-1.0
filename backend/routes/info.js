import express from "express";

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

router.get("/", (req, res) => {
  res.send("Hello from the backend!, info.js Home");
});

router.get("/get-seller/:id", authMiddleware, GetSeller);
router.get("/get-profile", authMiddleware, GetProfile);
router.put("/update-profile", authMiddleware, UpdateProfile);
router.get("/seller-products", authMiddleware, SellerProducts);
router.get("/view-product/:id", authMiddleware, ViewProduct);
router.put("/edit-product/:id", authMiddleware, EditProduct);
router.delete("/delete-product/:id", authMiddleware, DeleteProduct);

export default router;
