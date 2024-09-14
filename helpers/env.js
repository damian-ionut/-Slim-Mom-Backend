require("dotenv").config();

const { 
  PORT, 
  DB_HOST, 
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

module.exports = {
  PORT,
  DB_HOST,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
};