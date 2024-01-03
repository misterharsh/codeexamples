const register = async (req, res) => {
  res.status(200).send("/register");
};

const login = async (req, res) => {
  res.status(200).send("/login");
};

module.exports = {
  register,
  login,
};
