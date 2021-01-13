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
      .where({ title: task.title, user_id: task.user_id })
      .first();
    if (row) {
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
}

async function deleteTask(id, userId) {
  try {
    return await knex('tasks').where({ id, user_id: userId }).del();
  } catch (err) {
    return err;
  }
}

module.exports = {
  save,
  taskExists,
  deleteTask,
};
