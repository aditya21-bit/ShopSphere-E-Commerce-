const express = require("express");

const {
  placeOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Place Order
router.post("/", protect, placeOrder);

// Get Orders
router.get("/", protect, getOrders);

// Get Single Order
router.get("/:id", protect, getOrder);

// Update Order Status
router.put("/:id", protect, updateOrderStatus);

module.exports = router;