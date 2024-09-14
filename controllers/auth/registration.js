const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { createError } = require("../../helpers/errors");

const registration = async (req, res, _next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  return res.status(201).json({
    status: "Created",
    code: 201,
    message: `New user '${newUser.name}' was created`,
    data: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = registration;
