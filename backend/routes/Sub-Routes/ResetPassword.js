// Routes for Reset Password are defined in this file contains the following functions:
// - sendingOTP
// - verifyOTP
// - resetPassword
import bcrypt from "bcrypt";
import { User } from "../../models/User.js";
import sendOTP from "../../config/MailReset.js";

export const sendingOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      user.reset_OTP = OTP;
      await user.save();
      await sendOTP(email, OTP);
      // res.status(200).send({ message: "OTP sent successfully", otp: OTP });
      return res.status(200).json({ msg: "OTP sent check your email" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    if (!email || !OTP) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      if (user.reset_OTP == OTP) {
        return res.status(200).json({ msg: "OTP verified successfully" });
      } else {
        return res.status(400).json({ msg: "Invalid OTP" });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // if (!email || !password) {
    //   return res.send("Please fill in all fields");
    // }
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ msg: "Password reset successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
