const { createError } = require("../../helpers/errors");
const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  
  console.log("User ID for logout:", _id); 

  if (!_id) {
    console.error("User ID is missing");
    throw createError(401, "Not authorized");
  }

  try {
    await User.findByIdAndUpdate(_id, { token: null });
  } catch (error) {
    console.error("Failed to logout user:", error.message);
    return res.status(500).json({
      status: "ERROR",
      code: 500,
      message: "Failed to logout user",
      error: error.message,
    });
  }

  res.status(204).json({
    status: "No Content",
    code: 204,
    message: "Logout was successfully completed",
  }).end();
}

module.exports = logout;
