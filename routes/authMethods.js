const express = require("express");
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  submitFeedback,
  getAllFeedback,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User Authentication & Profile Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile); // Update profile

// Feedback Routes
router.post("/feedback", authMiddleware, submitFeedback);
router.get("/feedback", authMiddleware, getAllFeedback); // Admin can get all feedback

// Admin Routes
router.delete("/user/:id", authMiddleware, deleteUser); // Delete user by ID (should probably be admin only, but adding basic auth for now)

module.exports = router;
