const express = require("express");
const upload = require("../middleware/multer");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/ProductController");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// 🔍 Search products (MUST be before :id)
router.get("/search/:keyword", searchProducts);

// Get single product
router.get("/:id", getProductById);

// Create product
router.post("/", upload.single("image"), createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

module.exports = router;