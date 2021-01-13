const knex = require('../../config/connect');

async function save(task) {
  try {
    await knex('tasks').insert(task);
    return task;
  } catch (err) {
    return err;
  }
}

async function taskExists(task) {
  try {
    const row = await knex('tasks')
      .where({ title: task.title, description: task.description })
      .first();
    if (row) {
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
}

module.exports = {
  save,
  taskExists,
};
