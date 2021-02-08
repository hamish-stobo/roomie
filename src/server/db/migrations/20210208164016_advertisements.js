
exports.up = knex => {
    return knex.schema.createTable('advertisements', table => {
        table.uuid('id').unique().notNullable();
        table.uuid('user_id').unique().notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.float('rent', { precision: 2 }).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('advertisements');
};
