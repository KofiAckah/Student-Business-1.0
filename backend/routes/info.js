import express from "express";

import { GetUser } from "./Sub-Routes/Profile.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from the backend!, info.js Home");
});

router.get("/get-seller/:id", authMiddleware, GetUser);

export default router;
