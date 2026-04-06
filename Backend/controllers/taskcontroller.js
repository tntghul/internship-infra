const Task = require("../models/task");
const Redis = require("ioredis");


const redis = new Redis({
  host: "redis", // local Redis
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const createTask = async (req, res) => {
  try {
    const { title, input, operation } = req.body;

    const task = await Task.create({
      user: req.user, // middleware se aayega
      title,
      input,
      operation,
      status: "pending",
    });

    console.log("📤 Pushing to Redis:", task._id.toString());

    await redis.lpush("taskQueue", task._id.toString());
    
    res.status(201).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createTask , getTasks };