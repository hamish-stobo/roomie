
exports.up = function(knex) {
    knex.schema.createTable('advertisements', function (table) {
        table.uuid('id').unique();
        table.foreign('user_id').references('id').inTable('users');
        table.float('rent', { precision: 2 })
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('advertisements');
};
