const AppError = require("./app.error");

class CSVError extends AppError {
  constructor(fields) {
    super({ message: `Invalid csv file`, description: fields });
    this.name = "CSVError";
  }
}

module.exports = {
  CSVError,
};
