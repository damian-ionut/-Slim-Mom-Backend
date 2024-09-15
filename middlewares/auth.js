const { JWT_ACCESS_SECRET } = require("../helpers/env");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/errors");

const authenticateUser = async (token) => {
  try {
    console.log("Verifying token:", token);
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    console.log("Payload:", payload);
    return await User.findById(payload._id);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  console.log("Authorization header:", authorization);
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    console.error("Authorization header is missing or malformed");
    return next(createError(401, "Not authorized - missing or malformed token"));
  }

  try {
    console.log("Attempting to authenticate user with token:", token);
    const user = await authenticateUser(token);

    if (!user) {
      console.error("User not found");
      return next(createError(401, "Not authorized - user not found"));
    }

    if (user.token !== token) {
      console.error("Token mismatch for user:", user._id);
      return next(createError(401, "Not authorized - token mismatch"));
    }

    console.log("User authenticated:", user._id);
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    next(createError(401, "Not authorized - authentication error"));
  }
};

module.exports = auth;
