const getAll = async (req, res) => {
  res.status(200).send("/register");
};

const getById = async (req, res) => {
  res.status(200).send("/login");
};

const save = async (req, res) => {
  res.status(200).send("/login");
};

const update = async (req, res) => {
  res.status(200).send("/login");
};

const remove = async (req, res) => {
  res.status(200).send("/login");
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
};
