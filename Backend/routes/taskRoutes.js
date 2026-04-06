// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { createTask,getTasks } = require("../controllers/taskcontroller");
 const protect = require('../middleware/authMiddleware')

router.post("/tasks", protect, createTask);
router.get("/getTasks", protect, getTasks);

module.exports = router;