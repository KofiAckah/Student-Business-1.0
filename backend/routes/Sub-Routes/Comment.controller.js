import { Comment } from "../../models/Comment.js";
import { User } from "../../models/User.js";
import { Product } from "../../models/Product.js";

export const createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { id: productId } = req.params;
    const userId = req.user._id;

    const product = await Product.findById(productId);

    if (comment === "") {
      return res.status(401).json({ msg: "Fill the comment" });
    }

    const newComment = new Comment({
      userId,
      productId,
      comment,
    });

    if (newComment) {
      product.comments.push(newComment);
      await Promise.all([product.save(), newComment.save()]);
      // await newComment.save();
      res.status(200).json({ newComment, msg: "Comment added" });
    } else {
      res.status(400).json({ msg: "Comment not sent" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId)
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "comments",
        populate: { path: "userId" },
      });
    res.status(200).json(product.comments);
    // res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
