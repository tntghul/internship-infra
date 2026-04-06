const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  input: String,
  operation: String, // uppercase | lowercase | reverse | wordcount
  status: {
    type: String,
    enum: ["pending", "running", "success", "failed"],
    default: "pending",
  },
  result: String,
  logs: String,
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task; 