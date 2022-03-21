function removeInvalidFields({ acceptedFields, receivedFields }) {
  Object.keys(receivedFields).map((field) => {
    if (!acceptedFields.includes(field)) {
      delete receivedFields[field];
    }
  });

  return receivedFields;
}

module.exports = removeInvalidFields;
