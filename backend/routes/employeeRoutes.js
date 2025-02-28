const express = require("express");
const Task = require("../models/Task");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Get Employee Tasks
router.get("/tasks", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "employee") return res.status(403).json({ message: "Access Denied. Employees Only." });

    const tasks = await Task.find({ employeeId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Mark Task as Complete
router.put("/complete-task/:id", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "employee") return res.status(403).json({ message: "Access Denied. Employees Only." });

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });

    task.completed = true;
    await task.save();
    
    res.json({ message: "Task marked as complete" });
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
