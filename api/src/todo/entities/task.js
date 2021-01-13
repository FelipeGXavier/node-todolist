const yup = require('yup');
const formatErrorMessage = require('../util/yup_format');

const schema = yup.object().shape({
  title: yup
    .string()
    .required({ message: 'O Título da tarefa deve ser preenchido' })
    .min(3, {
      message: 'O Título da tarefa deve ter pelo menos 3 caracteres',
    })
    .max(50, {
      message: 'O Título da tarefa deve ter no máximo 50 caracteres',
    }),
  description: yup
    .string()
    .required({ message: 'A descrição da tarefa deve ser preenchida' })
    .min(3, {
      message: 'A descrição da tarefa deve ter pelo menos 3 caracteres',
    })
    .max(254, {
      message: 'A descrição da tarefa deve ter no máximo 254 caracteres',
    }),
  due_date: yup.date().default(() => new Date()),
  user_id: yup
    .number()
    .required({
      message: 'O identificador do usuário deve ser informado',
    })
    .positive({
      message: 'O identificador do usuário deve ser positivo',
    })
    .integer({
      message: 'O identificador do usuário deve ser um inteiro',
    }),
});

class Task {
  static async create(data) {
    try {
      await schema.validate(data, { abortEarly: false });
      const task = Object.assign(new Task(), data);
      return { task, valid: true };
    } catch (err) {
      return formatErrorMessage(err);
    }
  }
}

module.exports = Task;
