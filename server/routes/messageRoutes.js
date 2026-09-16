const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  getMessages,
  getMessageById,
  createMessage,
  markMessageAsRead,
  deleteMessage,
} = require("../controllers/messageController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Contact form rate limit
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 messages per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many messages sent. Please try again later.",
  },
});

// Public
router.post("/", messageLimiter, createMessage);

// Admin only
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessageById);
router.put("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;