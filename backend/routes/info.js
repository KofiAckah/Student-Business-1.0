import express from "express";

import { GetSeller, GetProfile, UpdateProfile } from "./Sub-Routes/Profile.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from the backend!, info.js Home");
});

router.get("/get-seller/:id", authMiddleware, GetSeller);
router.get("/get-profile", authMiddleware, GetProfile);
router.put("/update-profile", authMiddleware, UpdateProfile);

export default router;
