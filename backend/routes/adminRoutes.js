const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Task = require("../models/Task");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();
// Fetch All Employees
router.get("/employees", authenticate, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
  
    const employees = await User.find({}, "name email"); // Fetch name & email only
    res.json(employees);
  });
// Add Employee
router.post("/add-employee", authenticate, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: "Employee added" });
});

// Remove Employee
router.delete("/remove-employee/:id", authenticate, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });

  await User.findByIdAndDelete(req.params.id);
  await Task.deleteMany({ employeeId: req.params.id });
  res.json({ message: "Employee removed" });
});

// Assign Task
router.post("/assign-task", authenticate, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });

  const { employeeId, description } = req.body;
  const task = new Task({ employeeId, description });
  await task.save();
  res.json({ message: "Task assigned" });
});

module.exports = router;
