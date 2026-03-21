const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserPerformance,
} = require("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");

// Admin routes (protected)
router.get("/all", adminAuth, getAllUsers);
router.get("/:id", adminAuth, getUserById);
router.get("/:id/performance", adminAuth, getUserPerformance);

module.exports = router;
