const joiValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "ERROR",
        code: 400,
        message: error.details[0].message, 
      });
      return;
    }
    next();
  };
};

module.exports = joiValidation;
