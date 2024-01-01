const Product = require("../models/Product");

const getAll = async (req, res) => {
  const { name, featured, company, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  // regex used as substring check
  if (name) queryObj.name = { $regex: name, $options: "i" };
  // need to convert string to bool
  if (featured) queryObj.featured = featured == "true" ? true : false;
  if (company) queryObj.company = company;

  if (numericFilters) {
    operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$e",
      ">": "$gt",
      ">=": "$gte",
    };
    const regex = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((element) => {
      const [key, op, value] = element.split("-");
      if (options.includes(key)) {
        queryObj[key] = { [op]: Number(value) };
      }
    });
  }

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

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // resolving chained promise
  const products = await result;
  res.status(200).json({ meta: { count: products.length }, data: products });
};

module.exports = {
  getAll,
};
