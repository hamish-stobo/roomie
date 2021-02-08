
exports.up = function(knex) {
    knex.schema.createTable('location', function (table) {
        table.uuid('id').unique();
        table.string('suburb');
        table.integer('postcode');
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('advertisement_id').references('id').inTable('advertisements');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('location');
};
