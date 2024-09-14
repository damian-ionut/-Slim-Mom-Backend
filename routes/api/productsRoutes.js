const express = require("express");
const { ctrlWrapper, auth, joiValidation } = require("../../middlewares");
const { joiUserParamsSchema } = require("../../models");
const { productsCtrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  joiValidation(joiUserParamsSchema),
  ctrlWrapper(productsCtrl.getCaloriesAndNotAllowedProducts)
);

router.get("/:searchQuery", auth, ctrlWrapper(productsCtrl.getProduct));

module.exports = router;