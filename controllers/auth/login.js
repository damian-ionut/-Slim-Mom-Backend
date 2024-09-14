const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET } = require("../../helpers/env");
const { createError } = require("../../helpers/errors");


const login = async (req, res) => {
    const {email, password} = req.body
    const user =  await User.findOne({email});

    if (!user) {
      throw createError(403, "Wrong email or password");
    }
  
    const isValid = await bcrypt.compare(password, user.password);
  
    if (!isValid) {
      throw createError(403, "Wrong email or password");
    }

   const payload = {
    _id: user._id,
  }

  const token =  jwt.sign(payload, JWT_ACCESS_SECRET)
  await User.findByIdAndUpdate(user._id, {token})
 
  return res.json({
    status: "Success",
    code: 200,
    message: `'${user.name}' logins to app`,
    data: {
      token,
      userData: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
}

module.exports = login;