const { v4: uuidv4 } = require('uuid')

exports.seed = async knex => {
  //clear out user table and insert mock data
  try {
    await knex('users').del()
    await knex('users').insert([
          {id: uuidv4(), email: 'hello@test1.com', first_name: 'John', last_name: 'Smith'},
          {id: uuidv4(), email: 'testemail@test2.com', first_name: 'Jane', last_name: 'Kelly'},
          {id: uuidv4(), email: 'myemail@test1.com', first_name: 'Jeremy', last_name: 'Brown'}
      ])
    await knex('advertisements').del()
    const usersArray = await knex('users').select()
    await knex('advertisements').insert([
      {id: uuidv4(), user_id: userIdsArray[0].id, rent: Math.round(Math.random() * 200)},
      {id: uuidv4(), user_id: userIdsArray[1].id, rent: Math.round(Math.random() * 200)},
      {id: uuidv4(), user_id: userIdsArray[2].id, rent: Math.round(Math.random() * 200)}
    ])
    const advertisementsArray = await knex('advertisements').select('id')
    //here we will alternate between inserting a location record for an ad,
    //and inserting a location record for a user
    //ad location records have null user_id, 
    //user location records have null ad_id
    await knex('location').insert([
      {id: uuidv4(), suburb: 'Manurewa', postcode: 2102, user_id: userIdsArray[0]},
      {id: uuidv4(), suburb: 'Grey Lynn', postcode: 1021, advertisement_id: advertisementsArray[0]},
      {id: uuidv4(), suburb: 'Takapuna', postcode: 0622, user_id: userIdsArray[1]},
      {id: uuidv4(), suburb: 'Kohimarama', postcode: 1071, advertisement_id: advertisementsArray[1]},
      {id: uuidv4(), suburb: 'Remuera', postcode: 1050, user_id: userIdsArray[2]},
      {id: uuidv4(), suburb: 'Ellerslie', postcode: 1051, advertisement_id: advertisementsArray[2]}
    ])
  } catch (e) {
    console.error(`error from seed file :( ${e}`)
  }
  }