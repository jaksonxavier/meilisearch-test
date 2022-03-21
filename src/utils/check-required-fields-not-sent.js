function checkRequiredFieldsNotSent({ acceptedFields, receivedFields }) {
  const requiredFieldsNotSent = acceptedFields.filter(
    (requiredField) => !Object.keys(receivedFields).includes(requiredField)
  );

  return {
    fields: requiredFieldsNotSent,
    totalCount: requiredFieldsNotSent.length,
  };
}

module.exports = checkRequiredFieldsNotSent;
