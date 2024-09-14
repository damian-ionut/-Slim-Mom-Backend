const { Diary } = require("../../models");
const { createError } = require("../../helpers/errors");

const deleteProduct = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;
  const { productId } = req.params;

  const filterForFindDiary = {
    $and: [{ date: { $eq: date } }, { owner: { $eq: _id } }],
  };
  const userDiary = await Diary.findOne(filterForFindDiary);

  if (!userDiary) {
    throw createError(404, `There are no entries in the diary for ${date}`);
  }

  if (userDiary) {
    const userDiaryId = userDiary._id;

    const filterForDeleteProduct = { _id: userDiaryId };
    const updateForDeleteProduct = {
      $pull: { productList: { _id: productId } },
    };
    const optionsForDeleteProduct = { safe: true, multi: false };
    await Diary.findOneAndUpdate(
      filterForDeleteProduct,
      updateForDeleteProduct,
      optionsForDeleteProduct
    );

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Product removed",
    });
  }
};

module.exports = deleteProduct;