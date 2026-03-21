const express = require("express");
const router = express.Router();
const { adminLogin, verifyAdmin } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.post("/login", adminLogin);
router.get("/verify", adminAuth, verifyAdmin);

module.exports = router;
