const { RequiredFieldsError } = require("../errors/films.error");
const { removeInvalidFields, checkRequiredFieldsNotSent } = require("../utils");

const acceptedFields = [
  "exhibition_year",
  "title",
  "genre",
  "nationality",
  "distribution_company",
  "origin_distributor_company",
  "public_exhibition_year",
  "invoicing_exhibition_year",
];

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

  removeInvalidReceivedFields(req, res, next) {
    req.body = removeInvalidFields({
      acceptedFields,
      receivedFields: req.body,
    });

    next();
  },
};
