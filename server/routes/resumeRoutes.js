const express = require("express");

const {
  getResume,
  uploadResume,
  deleteResume,
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");
const resumeUpload = require("../middleware/resumeUploadMiddleware");

const router = express.Router();

// Public
router.get("/", getResume);

// Admin only
router.post("/", protect, resumeUpload.single("resume"), uploadResume);
router.delete("/", protect, deleteResume);

module.exports = router;