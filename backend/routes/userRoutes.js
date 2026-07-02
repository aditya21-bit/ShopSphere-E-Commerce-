const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;