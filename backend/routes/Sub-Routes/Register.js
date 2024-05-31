import { User } from "../../models/User.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.send("Please fill in all fields");
    }
    if (password !== confirmPassword) {
      return res.send("Passwords do not match");
    }
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
    }
  } catch (error) {
    res.send(error.message);
  }
};
