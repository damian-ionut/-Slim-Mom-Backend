const { User } = require("../../models");

const logout = async (req, res) => {
  if (!req.user || !req.user._id) {
    console.error("User not authenticated");
    return res.status(401).json({
      status: "ERROR",
      code: 401,
      message: "Not authorized",
    });
  }

  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      console.error("User not found");
      return res.status(404).json({
        status: "ERROR",
        code: 404,
        message: "User not found",
      });
    }

    user.token = null;
    await user.save();

    console.log(`User with ID: ${_id} successfully logged out`);

    res.clearCookie("token");  

    res.status(204).end();
  } catch (error) {
    console.error("Failed to logout user:", error.message);
    return res.status(500).json({
      status: "ERROR",
      code: 500,
      message: "Failed to logout user",
      error: error.message,
    });
  }
};

module.exports = logout;
