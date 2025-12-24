const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/inventory", async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalStockValue = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    res.status(200).json({
      totalProducts,
      totalStockValue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;