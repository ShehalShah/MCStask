const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
