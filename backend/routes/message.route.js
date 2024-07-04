import express from "express";
import { authMiddleware } from "../middleware/auth.js";

import { getMessages, createMessage } from "./Sub-Routes/message.controller.js";

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, createMessage);

export default router;
