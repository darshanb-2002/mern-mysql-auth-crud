const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const auth = require("../middleware/auth");

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);

// PASSWORD RESET ROUTES
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;