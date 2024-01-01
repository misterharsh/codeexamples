const Product = require("../models/Product");

const getAll = async (req, res) => {
  const { name, featured, company, sort, fields } = req.query;
  const queryObj = {};

  if (name) queryObj.name = { $regex: name, $options: "i" };
  if (featured) queryObj.featured = featured == "true" ? true : false;
  if (company) queryObj.company = company;

  let result = Product.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    // default sort
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const products = await result;
  res.status(200).json({ meta: { count: products.length }, data: products });
};

module.exports = {
  getAll,
};
