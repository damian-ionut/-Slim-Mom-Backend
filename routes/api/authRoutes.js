const express = require("express");
const { joiValidation, ctrlWrapper, auth } = require("../../middlewares");
const {
  joiSchemaRegister,
  joiSchemaLogin,
  joiRefreshTokensSchema,
} = require("../../models");
const { authCtrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  joiValidation(joiSchemaRegister),
  ctrlWrapper(authCtrl.registration)
);

router.post(
  "/login",
  joiValidation(joiSchemaLogin),
  ctrlWrapper(authCtrl.login)
);

router.post("/logout", auth, ctrlWrapper(authCtrl.logout));

router.post(
  "/refresh",
  joiValidation(joiRefreshTokensSchema),
  ctrlWrapper(authCtrl.refreshTokens)
);

module.exports = router;
