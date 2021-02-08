
exports.up = function(knex) {
    knex.schema.createTable('users', function (table) {
        table.uuid('id').unique();
        table.string('email').unique();
        table.string('first_name');
        table.string('last_name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
