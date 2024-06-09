import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // res.send("User does not exist");
      return res.status(400).json({ msg: "User does not exist" });
    } else if (!user.verified) {
      // res.send("User has not been verified");
      return res.status(400).json({ msg: "User has not been verified" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        // User logged in successfully, create a JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // Set the JWT as a cookie on the client's browser
        res.cookie("token", token, { httpOnly: true });

        // res.send("User logged in successfully");
        res.status(200).json({ msg: "User logged in successfully" });
      } else {
        // res.send("Invalid credentials");
        return res.status(400).json({ msg: "Invalid credentials" });
      }
    }
  } catch (error) {
    // res.send(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const dashboard = async (req, res) => {
  try {
    // res.send("Welcome to the dashboard");
    res.status(200).json({ msg: "Welcome to the dashboard" });
  } catch (error) {
    // res.send(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    // res.send("User logged out successfully");
    res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    // res.send(error.message);
    res.status(500).json({ msg: error.message });
  }
};
