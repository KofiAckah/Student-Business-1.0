import { Product } from "../../models/Product.js";

export const SearchProduct = async (req, res) => {
  try {
    // Extract search query from request query parameters
    const { query } = req.query;

    // Validate the query
    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
        msg: "There must an input",
      });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'title', 'location', 'category', and 'description' fields
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching the query",
        msg: "No matching product found",
      });
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
      return res.status(400).json({
        message: "Search query is required",
        msg: "There must an input",
      });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'title' field
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).sort({ createdAt: -1 });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching the query",
        msg: "No matching product found",
      });
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
      return res.status(400).json({
        message: "Search query is required",
        msg: "There must an input",
      });
    }

    // Search for products that match the query
    // Performing a case-insensitive search on 'location' field
    const products = await Product.find({
      location: { $regex: query, $options: "i" },
    }).sort({ createdAt: -1 });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching the query",
        msg: "No matching product found",
      });
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

// export const SearchByCategory = async (req, res) => {
export const SearchByOnlyCategory = async (req, res) => {
  try {
    // Extract category from request query parameters
    const { category } = req.query;

    // Validate the category
    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        msg: "Category must be provided",
      });
    }

    // Search for products within the specified category
    // The search is case-insensitive
    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: "i" },
    });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found in the specified category",
        msg: "No products found",
      });
    }

    // Return the found products to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({
      message: "An error occurred while searching for products by category",
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
      return res.status(400).json({
        message: "Minimum and maximum prices are required",
        msg: "Both min Price and max Price is required",
      });
    }

    if (minPrice > maxPrice) {
      return res.status(400).json({
        message: "Minimum price cannot be greater than maximum price",
        msg: "Minimum price cannot be greater than maximum price",
      });
    }

    // Search for products that match the query
    // Performing a search on 'price' field within the specified range
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).sort({ createdAt: -1 });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching the query",
        msg: "No matching product found",
      });
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

export const SearchByTitleAndCategory = async (req, res) => {
  try {
    // Extract title and category from request query parameters
    const { title, category } = req.query;

    // Validate the input
    if (!category) {
      return res.status(400).json({
        message: "Category empty",
        msg: "Select a Category",
      });
    }
    if (!title) {
      return res.status(400).json({
        message: "Title empty",
        msg: "Title is required",
      });
    }

    // Build the search query to match both title and category
    let searchQuery = { $and: [] };
    if (title) {
      searchQuery.$and.push({ title: { $regex: title, $options: "i" } });
    }
    if (category) {
      searchQuery.$and.push({ category: { $regex: category, $options: "i" } });
    }

    // Search for products matching both title and category
    const products = await Product.find(searchQuery).sort({ createdAt: -1 });

    // Check if products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching the criteria",
        msg: "No products found",
      });
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
