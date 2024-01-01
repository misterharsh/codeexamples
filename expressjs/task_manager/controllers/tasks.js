const asyncWrapper = require("../middleware/async");
const { createCustomAPIError } = require("../errors/api-error");

// models
const Task = require("../models/Task");

// crud functions
const getAll = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

const getById = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findById({ _id: taskId });
  if (!task) {
    return next(createCustomAPIError(404, `No task with id: ${taskId}`));
  }
  res.status(200).json(task);
});

const save = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const update = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomAPIError(404, `No task with id: ${taskId}`));
  }
  res.status(200).json(task);
});

const remove = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskId });
  if (!task) {
    return next(createCustomAPIError(404, `No task with id: ${taskId}`));
  }
  res.status(200).json(task);
});

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
};
