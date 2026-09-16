const express = require("express");
const rateLimit = require("express-rate-limit");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

// Admin login rate limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 login attempts per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, loginAdmin);

module.exports = router;