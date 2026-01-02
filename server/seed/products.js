const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");

const products = [
  { name: "Amul Milk 500ml", barcode: "8901262010016", price: 30 },
  { name: "Bread", barcode: "8901030875698", price: 40 },
  { name: "Butter", barcode: "8901725132327", price: 55 },
  { name: "Eggs (6 pcs)", barcode: "1111111111111", price: 45 },
  { name: "Sugar 1kg", barcode: "2222222222222", price: 48 },
  { name: "Rice 1kg", barcode: "3333333333333", price: 60 },
  { name: "Cooking Oil 1L", barcode: "4444444444444", price: 150 },
  { name: "Salt 1kg", barcode: "5555555555555", price: 20 }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (let product of products) {
      const exists = await Product.findOne({ barcode: product.barcode });
      if (!exists) {
        await Product.create(product);
        console.log(`Inserted: ${product.name}`);
      } else {
        console.log(`Skipped (exists): ${product.name}`);
      }
    }

    console.log("✅ Product seeding completed");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedProducts();
