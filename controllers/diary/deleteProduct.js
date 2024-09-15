const { Diary } = require("../../models");
const { createError } = require("../../helpers/errors");

const deleteProduct = async (req, res) => {
  const { _id } = req.user; 
  const { date } = req.body;
  const { productId } = req.params; 

  try {
    const userDiary = await Diary.findOne({ date, owner: _id });

    if (!userDiary) {
      throw createError(404, `There are no entries in the diary for ${date}`);
    }

    const updatedDiary = await Diary.findOneAndUpdate(
      { _id: userDiary._id },
      { $pull: { productList: { _id: productId } } },
      { new: true }
    );

    if (!updatedDiary) {
      throw createError(500, "Failed to remove product from diary");
    }

    return res.status(200).json({
      status: "Success",
      code: 200,
      message: "Product removed",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = deleteProduct;
