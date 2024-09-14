
const {
    User,
    joiSchemaRegister,
    joiSchemaLogin,
    Session,
    joiRefreshTokensSchema,
  } = require("./user");
  
  const { Product, joiUserParamsSchema } = require("./product");
  
  const {
    Diary,
    joiSchemaProductAdd,
    joiSchemaProductDelete,
  } = require("./diary");
  
  module.exports = {
    User,
    joiSchemaRegister,
    joiSchemaLogin,
    Session,
    joiRefreshTokensSchema,
    Product,
    joiUserParamsSchema,
    Diary,
    joiSchemaProductAdd,
    joiSchemaProductDelete,
  };
  