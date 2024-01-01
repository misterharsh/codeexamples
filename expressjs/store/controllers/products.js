const Product = require("../models/Product");

const getAll = async (req, res) => {
  const { name, featured, company } = req.query;
  const queryObj = {};

  if (name) queryObj.name = { $regex: name, $options: "i" };
  if (featured) queryObj.featured = featured == "true" ? true : false;
  if (company) queryObj.company = company;

  const products = await Product.find(queryObj);
  res.status(200).json({ meta: { count: products.length }, data: products });
};

module.exports = {
  getAll,
};
