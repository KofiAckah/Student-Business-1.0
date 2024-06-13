import { Product } from "../../models/Product.js";

export const PostProduct = async (req, res) => {
  try {
    const imageName = req.file ? req.file.filename : undefined;
    const {
      title,
      description,
      price,
      category,
      categoryOthers,
      color,
      colorOthers,
    } = req.body;
    if (!title || !description || !price || !imageName || !category) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    const product = new Product({
      title,
      description,
      price,
      image: imageName,
      category,
      categoryOthers,
      color,
      colorOthers,
      user: req.user._id,
    });
    await product.save();
    res.status(200).json({ msg: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const GetProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "email");
    const formattedProducts = products.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      postedBy: product.user.email,
    }));
    res.status(200).json(formattedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
