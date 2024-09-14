const app = require("./app");
const mongoose = require("mongoose");
require('dotenv').config();

const { MONGO_URI, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Database connection successful at host ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}. Press [Ctrl + C] in terminal to stop it.`);
    });
  })
  .catch((err) => {
    console.error("ERROR ", err);
    process.exit(1); 
  });
