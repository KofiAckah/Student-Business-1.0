import express from "express";

import { GetUser } from "./Sub-Routes/Profile.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/get-product/:id", authMiddleware, GetUser);

export default router;
