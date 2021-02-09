const { v4: uuidv4 } = require('uuid')

exports.seed = knex => {
  //clear out user table and insert mock data
  return knex('users').del()
    .then(() => knex('users').insert([
        {id: uuidv4(), email: 'hello@test1.com', first_name: 'John', last_name: 'Smith'},
        {id: uuidv4(), email: 'testemail@test2.com', first_name: 'Jane', last_name: 'Kelly'},
        {id: uuidv4(), email: 'myemail@test1.com', first_name: 'Jeremy', last_name: 'Brown'}
    ])
    )
    .then(() => {
      //clear out ads table, select all users to pull PK's, insert into ads table
      return knex('advertisements').del()
      .then(() => knex('users').select())
      .then(users => knex('advertisements').insert([
        {id: uuidv4(), user_id: users[0].id, rent: Math.round(Math.random() * 200)},
        {id: uuidv4(), user_id: users[1].id, rent: Math.round(Math.random() * 200)},
        {id: uuidv4(), user_id: users[2].id, rent: Math.round(Math.random() * 200)}
      ])
      )
    })
  }