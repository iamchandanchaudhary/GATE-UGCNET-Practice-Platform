const express = require("express");
const router = express.Router();
const {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  getActiveTests,
  getTestForAttempt,
  submitTest,
  getUserTestResults,
  getUserTestStats,
} = require("../controllers/testController");
const adminAuth = require("../middleware/adminAuth");
const { userAuth, optionalUserAuth } = require("../middleware/userAuth");

// Admin routes (protected)
router.post("/create", adminAuth, createTest);
router.get("/all", adminAuth, getAllTests);
router.get("/:id", adminAuth, getTestById);
router.put("/:id", adminAuth, updateTest);
router.delete("/:id", adminAuth, deleteTest);

// User routes (protected)
router.get("/user/results", userAuth, getUserTestResults);
router.get("/user/stats", userAuth, getUserTestStats);

// Public routes (for users/frontend)
router.get("/public/active", getActiveTests);
router.get("/public/:id", getTestForAttempt);
router.post("/public/:id/submit", optionalUserAuth, submitTest);

module.exports = router;
