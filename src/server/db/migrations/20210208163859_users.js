
exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.uuid('id').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('users')
};
