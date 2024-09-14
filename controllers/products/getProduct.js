const { Product } = require("../../models");
const { createError } = require("../../helpers/errors");

const getProduct = async (req, res) => {
  const searchedProduct = new RegExp(req.params.searchQuery, "gi");

  const product = await Product.find().or(
    { "title.ru": { $regex: searchedProduct } },
    { "title.ua": { $regex: searchedProduct } }
  );

  if (!product.length) {
    throw createError(404, `Product "${searchedProduct}" not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Product was found",
    data: {
      product,
    },
  });
};

module.exports = getProduct;