module.exports = class AppError {
  constructor({ message, statusCode = 400, description = undefined }) {
    this.message = message;
    this.statusCode = statusCode;

    if (description) {
      this.description = description;
    }
  }
};
