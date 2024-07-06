import express from "express";
import { authMiddleware } from "../middleware/auth.js";

import {
  getMessages,
  createMessage,
  getUsers,
  getChattedUsers,
} from "./Sub-Routes/message.controller.js";

const router = express.Router();

router.get("/users", authMiddleware, getUsers);
router.get("/chatted-users", authMiddleware, getChattedUsers);
router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, createMessage);

export default router;
