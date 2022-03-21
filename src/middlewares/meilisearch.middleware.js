const { RequiredFieldsError } = require("../errors/films.error");
const { removeInvalidFields, checkRequiredFieldsNotSent } = require("../utils");

const acceptedFields = ["uid", "primaryKey"];

module.exports = {
  validateRequiredFieldsHaveBeenSent(req, res, next) {
    const receivedFields = removeInvalidFields({
      acceptedFields,
      receivedFields: req.body,
    });

    const requiredFieldsNotSent = checkRequiredFieldsNotSent({
      acceptedFields,
      receivedFields,
    });

    if (requiredFieldsNotSent.totalCount) {
      throw new RequiredFieldsError(requiredFieldsNotSent);
    }

    next();
  },
};
