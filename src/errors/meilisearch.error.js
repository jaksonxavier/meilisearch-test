const AppError = require("./app.error");

class IndexNotFoundError extends AppError {
  constructor(id) {
    super({ message: `Index with id "${id}" was not found.`, statusCode: 404 });
    this.name = "IndexNotFound";
  }
}

class DocumentNotFoundError extends AppError {
  constructor({ indexId, documentId }) {
    super({
      message: `Document with id "${documentId}" was not found in index "${indexId}".`,
      statusCode: 404,
    });
    this.name = "DocumentNotFound";
  }
}

module.exports = {
  IndexNotFoundError,
  DocumentNotFoundError,
};
