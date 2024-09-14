const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchemaProductAdd, joiSchemaProductDelete } = require('../../models');
const { diaryCtrl } = require("../../controllers");

const router = express.Router();

router.get("/:date", auth, ctrlWrapper(diaryCtrl.getDiaryOnDate));
router.post("/", auth, joiValidation(joiSchemaProductAdd), ctrlWrapper(diaryCtrl.addProduct));
router.delete("/:productId",auth, joiValidation(joiSchemaProductDelete), ctrlWrapper(diaryCtrl.deleteProduct) )

module.exports = router;