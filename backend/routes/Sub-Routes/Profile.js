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

export const SellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const ViewProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const EditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.category = req.body.category;
    product.image = req.body.image;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
