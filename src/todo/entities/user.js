const yup = require('yup');
const formatErrorMessage = require('../util/yup_format');

const schema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .required({ message: 'O E-mail do usuário deve ser informado' })
    .min(3, {
      message: 'O E-mail do usuário deve ter pelo menos 3 caracteres',
    })
    .max(254, {
      message: 'O E-mail do usuário deve ter no máximo 254 caracteres',
    }),
});

class User {
  static async create(data) {
    try {
      await schema.validate(data, { abortEarly: false });
      const user = Object.assign(new User(), data);
      return { user, valid: true };
    } catch (err) {
      return formatErrorMessage(err);
    }
  }
}

module.exports = User;
