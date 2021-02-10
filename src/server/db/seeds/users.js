const { v4: uuidv4 } = require('uuid')

//function to pull Ids from the array of id objects returned from the select query
const pullIds = selectArr => {
  const idsArr = selectArr.map(idObj => {
    let id = idObj.id
    return id
  })
  return idsArr
}

exports.seed = async knex => {
  //clear out tables and insert mock data
  try {
    // alternative to promise chaining - using async/await syntax
    await knex('interest').del()
    await knex('location').del()
    await knex('advertisements').del()
    await knex('users').del()
    await knex('users').insert([
          {id: uuidv4(), email: 'hello@test1.com', first_name: 'John', last_name: 'Smith'},
          {id: uuidv4(), email: 'testemail@test2.com', first_name: 'Jane', last_name: 'Kelly'},
          {id: uuidv4(), email: 'myemail@test1.com', first_name: 'Jeremy', last_name: 'Brown'}
      ])
    const usersArray = await knex.select('id').from('users')
    const usersIdsArray = pullIds(usersArray)
    await knex('advertisements').insert([
      {id: uuidv4(), user_id: usersIdsArray[0], rent: Math.round(Math.random() * 200)},
      {id: uuidv4(), user_id: usersIdsArray[1], rent: Math.round(Math.random() * 200)},
      {id: uuidv4(), user_id: usersIdsArray[2], rent: Math.round(Math.random() * 200)}
    ])
    const advertisementsArray = await knex.select('id').from('advertisements')
    const advertisementsIdsArray = pullIds(advertisementsArray)
    //here we will alternate between inserting a location record for an ad,
    //and inserting a location record for a user
    //ad location records have null user_id, 
    //user location records have null ad_id
    await knex('location').insert([
      {id: uuidv4(), suburb: 'Manurewa', postcode: 2102, user_id: usersIdsArray[0]},
      {id: uuidv4(), suburb: 'Grey Lynn', postcode: 1021, advertisement_id: advertisementsIdsArray[0]},
      {id: uuidv4(), suburb: 'Takapuna', postcode: 0622, user_id: usersIdsArray[1]},
      {id: uuidv4(), suburb: 'Kohimarama', postcode: 1071, advertisement_id: advertisementsIdsArray[1]},
      {id: uuidv4(), suburb: 'Remuera', postcode: 1050, user_id: usersIdsArray[2]},
      {id: uuidv4(), suburb: 'Ellerslie', postcode: 1051, advertisement_id: advertisementsIdsArray[2]}
    ])
  } catch (e) {
    console.error(`error from seed file :( ${e}`)
  }
  }

  