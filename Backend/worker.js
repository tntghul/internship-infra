const Redis = require("ioredis");
const mongoose = require("mongoose");
const Task = require("./models/task");

// MongoDB connect (latest syntax, options removed)
mongoose.connect("mongodb://mongo:27017/ai_data")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || "redis-service",
  port: process.env.REDIS_PORT || 6379
});

// Process a single task
const processTask = async (taskId) => {
  console.log("⚙️ Processing task:", taskId);

  const task = await Task.findById(taskId);
  if (!task) {
    console.log("❌ Task NOT FOUND in DB"); 
    return;
  }
  console.log("✅ Task found:", task);
  try {
    task.status = "running";
    await task.save();

    console.log("⏳ Waiting 5 seconds...");

  // 🔥 YAHI DAALNA HAI DELAY
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

    console.log("🔄 Running operation:", task.operation);

    let result;
    switch (task.operation) {
      case "uppercase":
        result = task.input.toUpperCase();
        break;
      case "lowercase":
        result = task.input.toLowerCase();
        break;
      case "reverse":
        result = task.input.split("").reverse().join("");
        break;
      case "wordcount":
        result = task.input.split(" ").length;
        break;
      default:
        result = "Invalid operation";
    }

    console.log("🧾 Result:", result); 

    task.result = result;
    task.status = "success";
    task.logs = `Processed at ${new Date()}`;
    await task.save();

    console.log("✅ Task completed");

  } catch (err) {
     console.log("❌ ERROR:", err);

    task.status = "failed";
    task.logs = err.message;
    await task.save();
  }
};

// Poll Redis queue continuously
const pollQueue = async () => {
  console.log("🚀 Worker started... waiting for tasks..."); // 👈 ADD

  while (true) {
    const taskId = await redis.rpop("taskQueue");

    if (taskId) {
      console.log("📥 Got task from queue:", taskId); // 👈 ADD
      await processTask(taskId);
    } else {
      console.log("⏳ No task... waiting..."); // 👈 ADD
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// Start polling
pollQueue();