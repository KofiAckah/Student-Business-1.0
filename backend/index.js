import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDB.js";
import accountRoutes from "./routes/account.js";

// Load the environment variables
dotenv.config();

const app = express();
const PORT = 3005 || process.env.PORT;

// Connecting to the database
connectDB();

// EJS Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/account", accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
