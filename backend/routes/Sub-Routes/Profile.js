import { User } from "../../models/User.js";
import { Product } from "../../models/Product.js";

export const GetSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "user",
      "username email createdAt image phone bio"
    );
    const formattedProduct = {
      username: product.user.username,
      email: product.user.email,
      image: product.user.image,
      phone: product.user.phone,
      bio: product.user.bio,
      yearJoin: product.user.createdAt,
    };
    res.status(200).json(formattedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const GetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "username email createdAt image phone bio"
    );
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.username = req.body.username;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.bio = req.body.bio;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
