
exports.up = knex => {
    return knex.schema.createTable('location', table => {
        table.uuid('id').unique().notNullable();
        table.string('suburb').notNullable();
        table.integer('postcode').notNullable();
        table.uuid('user_id')
        table.foreign('user_id').references('id').inTable('users');
        table.uuid('advertisement_id');
        table.foreign('advertisement_id').references('id').inTable('advertisements');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('location');
};
