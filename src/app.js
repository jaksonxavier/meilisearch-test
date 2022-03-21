require("express-async-errors");

const express = require("express");

const AppError = require("./errors/app.error");

const router = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use(function (error, req, res, next) {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, description: error.description });
  }

  return res.status(500).json({
    message: error.message,
  });
});

app.all("*", function (req, res) {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
