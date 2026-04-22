const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserPerformance,
  deleteUser,
  getProfile,
  updateProfile,
  getMyResults,
} = require("../controllers/userController");
const adminAuth = require("../middleware/adminAuth");
const { userAuth } = require("../middleware/userAuth");

// User routes (protected by user auth)
router.get("/profile", userAuth, getProfile);
router.put("/profile", userAuth, updateProfile);
router.get("/profile/results", userAuth, getMyResults);

// Admin routes (protected by admin auth)
router.get("/all", adminAuth, getAllUsers);
router.get("/:id", adminAuth, getUserById);
router.get("/:id/performance", adminAuth, getUserPerformance);
router.delete("/:id", adminAuth, deleteUser);

module.exports = router;
