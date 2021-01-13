const Task = require('../entities/task');
const { save, taskExists } = require('../repository/taskRepository');
const { findUserById } = require('../repository/userRepository');

const checkUserExists = async (res, result) => {
  const user = await findUserById(result.task.user_id);
  if (!user) {
    res.status(400);
    return res.json({
      message: 'Esse usuário não existe',
    });
  }
  return null;
};

const checkTaskExists = async (res, result) => {
  const exists = await taskExists(result.task);
  if (exists) {
    res.status(409);
    return res.json({
      message: 'Essa tarefa já existe',
    });
  }
  return null;
};

async function insert(req, res) {
  // eslint-disable-next-line camelcase
  const { title, description, due_date, user_id } = req.body;
  const result = await Task.create({ title, description, due_date, user_id });
  const checkUser = await checkUserExists(res, result);
  if (checkUser) {
    return checkUser;
  }
  const checkTask = await checkTaskExists(res, result);
  if (checkTask) {
    return checkTask;
  }
  if (result.valid) {
    const task = await save(result.task);
    return res.send(task);
  }
  res.status(400);
  return res.send(result);
}

module.exports = {
  insert,
};
