import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
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
  category: {
    type: String,
    required: true,
    enum: [
      "Clothes",
      "Electronics",
      "Food",
      "Home Appliances",
      "Services",
      "Software",
      "Others",
    ],
  },
  categoryOthers: {
    type: String,
    default: "",
  },
  condition: {
    type: String,
    enum: ["New", "Used", ""],
  },
  negotiable: {
    type: Boolean,
    required: true,
    default: false,
  },
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
