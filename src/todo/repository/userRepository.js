const knex = require('../../config/connect');

async function save(user) {
  try {
    await knex('users').insert(user);
    return user;
  } catch (err) {
    return err;
  }
}

async function userExists(email) {
  try {
    const row = await knex('users').where({ email }).first();
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
  userExists,
};
