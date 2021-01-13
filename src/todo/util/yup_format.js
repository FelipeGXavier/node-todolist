const format = (validation) => {
  const { errors } = validation;
  const target = Object.keys(validation.value)[0];
  return { target, errors, valid: false };
};

module.exports = format;
