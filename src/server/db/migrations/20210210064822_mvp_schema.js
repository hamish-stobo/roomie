
exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.uuid('id').unique().notNullable()
        table.string('email').unique().notNullable()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
      .createTable('advertisements', table => {
        table.uuid('id').unique().notNullable()
        table.uuid('user_id').unique().notNullable()
        table.foreign('user_id').references('id').inTable('users')
        table.float('rent', { precision: 2 }).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
      .createTable('location', table => {
        table.uuid('id').unique().notNullable()
        table.string('suburb').notNullable()
        table.integer('postcode').unsigned().notNullable()
        table.uuid('user_id').unique()
        table.foreign('user_id').references('id').inTable('users')
        table.uuid('advertisement_id').unique()
        table.foreign('advertisement_id').references('id').inTable('advertisements')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .createTable('interest', table => {
        table.uuid('id').unique().notNullable()
        table.uuid('user_id').notNullable()
        table.foreign('user_id').references('users.id')
        table.uuid('advertisement_id').notNullable()
        table.foreign('advertisement_id').references('advertisements.id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
}

exports.down = knex => {
    return knex.schema.dropTableIfExists('interest')
        .dropTableIfExists('location')
        .dropTableIfExists('advertisements')
        .dropTableIfExists('users')
}
