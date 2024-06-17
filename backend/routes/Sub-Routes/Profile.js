import { User } from "../../models/User.js";
import { Product } from "../../models/Product.js";

export const GetUser = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "user",
      "username email createdAt"
    );
    const formattedProduct = {
      username: product.user.username,
      email: product.user.email,
      yearJoin: product.user.createdAt,
    };
    res.status(200).json(formattedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
