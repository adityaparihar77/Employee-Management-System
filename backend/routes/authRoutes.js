const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Admin Login
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === "Aditya@gmail.com" && password === "Asdfgh@1234") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token, role: "admin" });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

// Employee Login
router.post("/employee/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, role: "employee" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, role: "employee" });
});

module.exports = router;
