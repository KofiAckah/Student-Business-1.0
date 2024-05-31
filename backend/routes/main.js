import express from "express";

import { Register } from "./Sub-Routes/Register.js";
import { Login } from "./Sub-Routes/Login.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from the backend!, main.js Home");
});

router.post("/register", Register);
router.post("/login", Login);

export default router;
