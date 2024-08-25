import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { connectDB } from "./config/connectDB.js";
import accountRoutes from "./routes/account.js";
import userInfo from "./routes/info.js";
import message from "./routes/message.route.js";
import category from "./routes/category.route.js";
import MongoStore from "connect-mongo";
import session from "express-session";

// Load the environment variables
dotenv.config();

const app = express();
const PORT = 3005 || process.env.PORT;

// Connecting to the database
connectDB();

// EJS Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "student-business-1-0.vercel.app",
    // origin: "http://localhost:5173",
    // Adjust according to your frontend URL
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/account", accountRoutes);
app.use("/user", userInfo);
app.use("/message", message);
app.use("/category", category);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
