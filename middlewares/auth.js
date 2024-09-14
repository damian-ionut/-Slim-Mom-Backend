const { JWT_ACCESS_SECRET } = require("../helpers/env");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/errors");

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    console.log("Token payload:", payload); 
    return await User.findById(payload._id);
  } catch (error) {
    console.error("Token verification failed:", error.message); 
    return null;
  }
};

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  console.log("Authorization header:", authorization);
  console.log("Bearer part:", bearer); 
  console.log("Token part:", token); 

  if (bearer !== "Bearer" || !token) {
    console.error("Authorization header is missing or malformed"); 
    return next(createError(401, "Not authorized"));
  }

  const user = await authenticateUser(token);

  if (!user || user.token !== token) {
    console.error("User not found or token mismatch");
    return next(createError(401, "Not authorized"));
  }

  req.user = user;
  next();
};

module.exports = auth;
