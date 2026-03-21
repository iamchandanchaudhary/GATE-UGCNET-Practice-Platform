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
} = require("../controllers/testController");
const adminAuth = require("../middleware/adminAuth");

// Admin routes (protected)
router.post("/create", adminAuth, createTest);
router.get("/all", adminAuth, getAllTests);
router.get("/:id", adminAuth, getTestById);
router.put("/:id", adminAuth, updateTest);
router.delete("/:id", adminAuth, deleteTest);

// Public routes (for users/frontend)
router.get("/public/active", getActiveTests);
router.get("/public/:id", getTestForAttempt);
router.post("/public/:id/submit", submitTest);

module.exports = router;
