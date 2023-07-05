const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET /tasks
router.get('/tasks', async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /tasks
router.post('/tasks', async (req, res) => {
  try {
    // Create a new task with the data from the request body
    const task = new Task(req.body);
    // Save the task to the database
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Export the router
module.exports = router;

