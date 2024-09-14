const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/authRoutes");
const productsRouter = require("./routes/api/productsRoutes");
const diaryRouter = require("./routes/api/diaryRoutes");
const usersRouter = require("./routes/api/usersRoutes");
const swaggerRouter = require("./routes/api/swaggerRoutes");
const { createError } = require("./helpers/errors");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/", swaggerRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/diary", diaryRouter);

app.use((req, res) => {
  throw createError(404, "Not found");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;