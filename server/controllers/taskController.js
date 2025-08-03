const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.create({ userId: req.userId, title, description, status });
  res.status(201).json(task);
};