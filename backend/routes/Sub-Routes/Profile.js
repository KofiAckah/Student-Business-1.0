import { User } from "../../models/User.js";
import { Product } from "../../models/Product.js";

export const GetSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "user",
      "username email createdAt image phone bio id"
    );
    const formattedProduct = {
      UserId: product.user._id,
      username: product.user.username,
      email: product.user.email,
      image: product.user.image,
      phone: product.user.phone,
      bio: product.user.bio,
      yearJoin: product.user.createdAt,
    };
    const UserId = formattedProduct.UserId;
    const products = await Product.find({ user: UserId }).sort({
      createdAt: -1,
    });
    const sellerInfo = { ...formattedProduct, products };
    res.status(200).json(sellerInfo);
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
    const imageName = req.file ? req.file.filename : undefined;
    const user = await User.findById(req.user._id);
    user.username = req.body.username;
    user.email = req.body.email;
    user.phone = req.body.phone;
    imageName !== undefined
      ? (user.image = imageName)
      : (user.image = req.body.image);
    user.bio = req.body.bio;
    if (!user.username || !user.email || !user.phone) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    await user.save();
    res.status(200).json({ msg: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
    console.log("error", error.message);
  }
};

export const SellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
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
    const imageName = req.file ? req.file.filename : undefined;
    const product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.location = req.body.location;
    product.description = req.body.description;
    product.price = req.body.price;
    imageName !== undefined
      ? (product.image = imageName)
      : (product.image = req.body.image);
    product.category = req.body.category;
    product.categoryOthers = req.body.categoryOthers;
    product.condition = req.body.condition;
    product.negotiable = req.body.negotiable;
    if (
      !product.title ||
      !product.price ||
      !product.location ||
      !product.image ||
      !product.category
    ) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    await product.save();
    res.status(200).json({ msg: "Product edited successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
    console.log("error Message", error.message);
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
