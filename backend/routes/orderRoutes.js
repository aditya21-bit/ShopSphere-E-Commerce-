const express = require("express");

const {
  placeOrder,
  getOrders,
  getOrder,
    updateOrderStatus,
} = require("../controllers/orderController");


const router = express.Router();

// Place Order
router.post("/", placeOrder);

// Get All Orders
router.get("/", getOrders);

// Get Single Order
router.get("/:id", getOrder);

// Update Order Status
router.put("/:id", updateOrderStatus);

module.exports = router;