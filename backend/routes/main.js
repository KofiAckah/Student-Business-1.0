import express from "express";

import { User } from "../models/User.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from the backend!, main.js Home");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default router;
