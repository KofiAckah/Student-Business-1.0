require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();

// Checking if connected to the database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
