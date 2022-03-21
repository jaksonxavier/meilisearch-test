const AppError = require("./app.error");

class FilmNotFoundError extends AppError {
  constructor(id) {
    super({ message: `Film with id "${id}" was not found.`, statusCode: 404 });
    this.name = "FilmNotFound";
  }
}

class RequiredFieldsError extends AppError {
  constructor(fields) {
    super({ message: "Required field not sent.", description: fields });
    this.name = "RequiredFieldsError";
  }
}

module.exports = {
  FilmNotFoundError,
  RequiredFieldsError,
};
