import { User } from "../../models/User.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send("User does not exist");
    } else if (!user.verified) {
      res.send("User has not been verified");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.send("User logged in successfully");
      } else {
        res.send("Invalid credentials");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
