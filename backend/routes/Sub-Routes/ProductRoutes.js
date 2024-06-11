import { Product } from "../../models/Product.js";

export const PostProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({
      name,
      description,
      price,
      user: req.user._id,
    });
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "username");
    const formattedProducts = products.map((product) => ({
      name: product.name,
      postedBy: product.user ? product.user.username : "Unknown",
    }));
    res.status(200).json(formattedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
