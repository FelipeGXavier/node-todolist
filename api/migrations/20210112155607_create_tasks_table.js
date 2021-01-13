/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.timestamp('due_date');
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
