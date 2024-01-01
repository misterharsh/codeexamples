// models
const Task = require("../models/Task");

// crud functions
const getAll = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getById = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findById({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskId}` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const save = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const update = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskId}` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const remove = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskId}` });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
};
