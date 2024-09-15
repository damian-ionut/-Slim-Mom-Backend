const getCurrentUser = async (req, res) => {
  const { _id, name, email, parameters, notAllowedProducts } = req.user;

  res.json({
    status: "OK",
    code: 200,
    message: `'${name}' user data`,
    data: { _id, name, email, parameters, notAllowedProducts },
  });
};

module.exports = getCurrentUser;
