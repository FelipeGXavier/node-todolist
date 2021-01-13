const format = (validation) => {
  const { errors } = validation;
  return { errors, valid: false };
};

module.exports = format;
