const Product = require("../models/product");

// STOCK IN
exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.quantity += quantity;
    await product.save();

    res.status(200).json({
      message: "Stock added successfully",
      product
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STOCK OUT
exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.quantity -= quantity;
    await product.save();

    res.status(200).json({
      message: "Stock removed successfully",
      product
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};