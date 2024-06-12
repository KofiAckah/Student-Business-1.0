import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  //   enum: [
  //     "Clothes",
  //     "Electronics",
  //     "Food",
  //     "Home Appliances",
  //     "Services",
  //     "Software",
  //     "Others",
  //   ],
  // },
  // color: {
  //   type: String,
  //   enum: [
  //     "Black",
  //     "White",
  //     "Red",
  //     "Blue",
  //     "Green",
  //     "Yellow",
  //     "Gray",
  //     "Brown",
  //     "Violet",
  //     "Others",
  //   ],
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
