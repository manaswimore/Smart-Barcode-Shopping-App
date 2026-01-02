const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Scan barcode → fetch product
router.post("/", async (req, res) => {
  try {
    const { barcode } = req.body;

    if (!barcode) {
      return res.status(400).json({ msg: "Barcode is required" });
    }

    const product = await Product.findOne({ barcode });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
