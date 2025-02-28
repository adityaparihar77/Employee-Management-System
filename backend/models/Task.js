const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  description: String,
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
