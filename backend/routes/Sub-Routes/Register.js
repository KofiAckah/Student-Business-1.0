import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Token from "../../middleware/tokenizer.js";
import sendMail from "../../config/MailService.js";

export const Register = async (req, res) => {
  try {
    // const { username, email, password, confirmPassword } = req.body;
    // if (!username || !email || !password || !confirmPassword) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.send("Please fill in all fields");
    }
    // if (password !== confirmPassword) {
    //   return res.send("Passwords do not match");
    // }
    const user = await User.findOne({ email });
    if (user) {
      res.send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User registered successfully");

      // generate token
      const token = crypto.randomBytes(32).toString("hex");
      const newToken = new Token({
        userId: newUser._id,
        token,
      });
      await newToken.save();
      console.log("Token saved successfully");
      // http://localhost:5000/verify/${token}
      const link = `http://localhost:5000/verify/${token}`;
      await sendMail(email, link);
      console.log("Email sent successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
};

// Link to verify account
export const Verify = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      return res.send("Invalid token");
    }
    const user = await User.findOne({ _id: token.userId });
    if (!user) {
      return res.send("User does not exist");
    }
    user.verified = true;
    await user.save();
    res.send("Account verified successfully");
  } catch (error) {
    res.send(error.message);
  }
};

// Another code of link to verify account
// export const Verify = async (req, res) => {
//   try {
//     const token = await Token.findOne({ token: req.params.token });
//     console.log(token);
//     await User.updateOne({ _id: token.userId }, { $set: { verified: true } });
//     await Token.findByIdAndDelete(token._id);
//     res.send("Account verified successfully");
//   } catch (error) {
//     res.send(error.message);
//   }
// };
