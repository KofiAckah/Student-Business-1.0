import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
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
      default: "",
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
        "Student Needs",
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
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
