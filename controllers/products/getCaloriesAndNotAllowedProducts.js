const { Product } = require("../../models");
const { createError } = require("../../helpers/errors");
const { calculateCalories } = require("../../helpers/calculateCalories");

const getCaloriesAndNotAllowedProducts = async (req, res) => {
  const { bloodType } = req.body;

  if (typeof bloodType !== 'number' || bloodType < 1 || bloodType > 4) {
    throw createError(400, "Invalid blood type");
  }

  const notAllowedProducts = await Product.find(
    { [`groupBloodNotAllowed.${bloodType}`]: { $eq: true } },
    "-__v"
  ).sort({ calories: -1 }).limit(10);

  if (notAllowedProducts.length === 0) {
    throw createError(404, "Not Found");
  }

  const calories = calculateCalories(req.body);

  res.json({
    status: "Success",
    code: 200,
    message: "Calories and not allowed products information",
    data: {
      notAllowedProducts,
      calories,
    },
  });
};

module.exports = getCaloriesAndNotAllowedProducts;
