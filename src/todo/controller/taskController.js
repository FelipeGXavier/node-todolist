const Task = require('../entities/task');
const { save, taskExists } = require('../repository/taskRepository');

async function insert(req, res) {
  // eslint-disable-next-line camelcase
  const { title, description, due_date, user_id } = req.body;
  const result = await Task.create({ title, description, due_date, user_id });
  if (result.valid) {
    const exists = await taskExists(result.task);
    if (exists) {
      res.status(409);
      return res.json({
        message: 'Essa tarefa já existe',
      });
    }
    const task = await save(result.task);
    return res.send(task);
  }
  res.status(400);
  return res.send(result);
}

module.exports = {
  insert,
};
