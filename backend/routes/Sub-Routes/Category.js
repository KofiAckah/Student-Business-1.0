import { Product } from "../../models/Product.js";

export const ClothesCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Clothes" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const ElectronicsCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Electronics" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const FoodCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Food" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const HomeAppliancesCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Home Appliances" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const ServicesCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Services" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const SoftwareCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Software" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const StudentNeedsCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Student Needs" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

export const OthersCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: "Others" }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
