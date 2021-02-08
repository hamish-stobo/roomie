
exports.up = knex => {
    return knex.schema.createTable('interest', table => {
        table.uuid('id').unique().notNullable();
        table.uuid('user_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.uuid('advertisement_id').notNullable();
        table.foreign('advertisement_id').references('advertisements.id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('interest');
};
