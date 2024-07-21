import express from "express";
import { authMiddleware } from "../middleware/auth.js";

import {
  ClothesCategory,
  ElectronicsCategory,
  FoodCategory,
  HomeAppliancesCategory,
  ServicesCategory,
  SoftwareCategory,
  StudentNeedsCategory,
  OthersCategory,
} from "./Sub-Routes/Category.js";

const router = express.Router();

router.get("/clothes", authMiddleware, ClothesCategory);
router.get("/electronics", authMiddleware, ElectronicsCategory);
router.get("/food", authMiddleware, FoodCategory);
router.get("/home-appliances", authMiddleware, HomeAppliancesCategory);
router.get("/services", authMiddleware, ServicesCategory);
router.get("/software", authMiddleware, SoftwareCategory);
router.get("/student-needs", authMiddleware, StudentNeedsCategory);
router.get("/others", authMiddleware, OthersCategory);

export default router;
