const { v4: uuidv4 } = require('uuid');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: uuidv4(), email: 'hello@test1.com', first_name: 'John', last_name: 'Smith'},
        {id: uuidv4(), email: 'testemail@test2.com', first_name: 'Jane', last_name: 'Kelly'},
        {id: uuidv4(), email: 'myemail@test1.com', first_name: 'Jeremy', last_name: 'Brown'}      ]);
    });
};
