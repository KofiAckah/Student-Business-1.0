import { Product } from "../../models/Product.js";

export const SearchProduct = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;

    // Validate the query
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'title', 'location', 'category', and 'condition' fields
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { condition: { $regex: query, $options: "i" } },
      ],
    });

    // Check if products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products",
      error: error.message,
    });
  }
};

export const SearchByOnlyTitle = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;

    // Validate the query
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'title' field
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });

    // Check if products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products",
      error: error.message,
    });
  }
};

export const SearchByOnlyLocation = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;

    // Validate the query
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'location' field
    const products = await Product.find({
      location: { $regex: query, $options: "i" },
    });

    // Check if products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products",
      error: error.message,
    });
  }
};

export const SearchByOnlyCategory = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;

    // Validate the query
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'category' field
    const products = await Product.find({
      category: { $regex: query, $options: "i" },
    });

    // Check if products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products",
      error: error.message,
    });
  }
};

export const SearchByOnlyCondition = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;

    // Validate the query
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'condition' field
    const products = await Product.find({
      condition: { $regex: query, $options: "i" },
    });

    // Check if products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products",
      error: error.message,
    });
  }
};

export const SearchByPriceRange = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { minPrice, maxPrice } = req.query;

    // Validate the query
    if (!minPrice || !maxPrice) {
      return res
        .status(400)
        .json({ message: "Minimum and maximum prices are required" });
    }

    // Search for products that match the query
    // Performing a search on 'price' field within the specified range
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    // Check if products were found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products",
      error: error.message,
    });
  }
};
