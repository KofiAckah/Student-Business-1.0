import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  // const token = req.header("x-auth-token"); // This code did not work
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ msg: "Authorization denied" });
    }
    next();
  } catch (err) {
    // res.status(401).json({ msg: "Token is not valid" });
    res.status(401).json({ msg: "Login before getting access" });
  }
};
