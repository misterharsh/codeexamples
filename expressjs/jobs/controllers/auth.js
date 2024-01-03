const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // validation happens at mongo level
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.status(200).send("/login");
};

module.exports = {
  register,
  login,
};
