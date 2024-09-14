const { User, Product } = require("../../models");
const { createError } = require("../../helpers/errors");
const { calculateCalories } = require("../../helpers/calculateCalories");

const updateUserParameters = async (req, res) => {
  const { bloodType } = req.body;
  const userId = req.user._id;

  if (bloodType < 1 || bloodType > 4) {
    throw createError(400, "Invalid blood type");
  }

  const notAllowedProducts = await Product.find(
    { [`groupBloodNotAllowed.${bloodType}`]: { $eq: true } },
    "-__v"
  ).limit(50).sort({ calories: -1 });

  if (notAllowedProducts.length === 0) {
    throw createError(404, "No restricted products found");
  }

  const calories = calculateCalories(req.body);

  const parameters = {
    ...req.body,
    calories,
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { parameters, notAllowedProducts },
      { new: true }
    );

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.json({
      status: "Success",
      code: 200,
      message: "User parameters updated successfully",
      data: { parameters, notAllowedProducts },
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      code: 500,
      message: "An error occurred while updating user parameters",
      error: error.message,
    });
  }
};

module.exports = updateUserParameters;
