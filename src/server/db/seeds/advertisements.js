const { v4: uuidv4 } = require('uuid');

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('advertisements').del()
    .then(() => {
      // Inserts seed entries
      return knex('advertisements').insert([
          {id: uuidv4(), user_id: '071eef6c-ef58-4b76-959b-4df031321c6c', rent: 340.00},
          {id: uuidv4(), user_id: 'd3d51e9d-ed94-4ba7-89a8-2bafc68e5077', rent: 320.50},
          {id: uuidv4(), user_id: '97fb71cb-4dc8-4ebe-b137-761df62b4a23', rent: 340.00}
        ]);
    });
};
