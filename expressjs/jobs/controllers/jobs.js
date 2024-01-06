const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAll = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ meta: { count: jobs.length }, data: jobs });
};

const getById = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findById({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const save = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const update = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company == "" || position == "") {
    throw new BadRequestError("Missing body properties");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const remove = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
};
