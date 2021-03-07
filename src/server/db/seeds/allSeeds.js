const { v4: uuidv4 } = require('uuid')

//function to pull Ids from the array of id objects returned from the select query
const pullIds = (prop, selectArr) => {
  const idsArr = selectArr.map(idObj => idObj[prop])
  return idsArr
}

exports.seed = async knex => {
  //clear out tables and insert mock data
  try {
    // alternative to promise chaining - using async/await syntax
    await knex('likes').del()
    await knex('images').del()
    await knex('listings').del()
    await knex('users').del()
    await knex('users').insert([
          {user_id: uuidv4(), email: 'hello@test1.com', first_name: 'John', last_name: 'Smith', password: 'test1', user_location: 'Glen Innes'},
          {user_id: uuidv4(), email: 'testemail@test2.com', first_name: 'Jane', last_name: 'Kelly', password: 'test2', user_location: 'Papakura'},
          {user_id: uuidv4(), email: 'myemail@test1.com', first_name: 'Jeremy', last_name: 'Brown', password: 'test3', user_location: 'Remuera'}
      ])
    const usersArray = await knex.select('user_id').from('users')
    const usersIdsArray = pullIds('user_id', usersArray)
    await knex('listings').insert([
      {listing_id: uuidv4(), listings_user_id: usersIdsArray[0], rent: Math.round(Math.random() * 200), listing_location: 'Orakei', tagline: 'Come join the team!', description: 'Bicycle rights locavore quinoa poke jean shorts portland hammock 3 wolf moon vape shaman heirloom next level cardigan chillwave vinyl. Disrupt DIY hella, YOLO post-ironic photo booth poutine jean shorts 8-bit fanny pack. Readymade YOLO austin hoodie cliche beard art party chambray kinfolk. Pitchfork pickled austin salvia iPhone descriptiondiesel post-ironic adaptogen celiac drinking vinegar live-edge palo santo blog pork belly umami. descriptiondiesel ugh banjo godard hoodie, squid cred woke narwhal. Microdosing dreamcatcher man braid actually air plant, selvage bespoke la croix godard copper mug affogato intelligentsia raclette.'},
      {listing_id: uuidv4(), listings_user_id: usersIdsArray[1], rent: Math.round(Math.random() * 200), listing_location: 'Mission Bay', tagline: 'Room available immediately!', description: 'Cliche messenger bag man braid, occupy yuccie tbh scenester lyft. Mlkshk four dollar toast salvia ramps fanny pack drinking vinegar literally enamel pin PBR&B. Heirloom bushwick photo booth pickled irony. Selvage man braid hella narwhal before they sold out.'},
      {listing_id: uuidv4(), listings_user_id: usersIdsArray[2], rent: Math.round(Math.random() * 200), listing_location: 'Grey Lynn', tagline: 'Join our lovely flat!', description: 'Narwhal iPhone banjo pork belly normcore woke. VHS next level post-ironic keytar snackwave portland. Fashion axe vape +1 skateboard ugh. YOLO food truck put a bird on it semiotics, hexagon actually wolf knausgaard copper mug squid photo booth schlitz cornhole thundercats. Forage flexitarian 3 wolf moon chillwave. Vice pour-over before they sold out tumblr master cleanse asymmetrical.'}
    ])
    const listingsArray = await knex.select('listing_id').from('listings')
    const listingsIdsArray = pullIds('listing_id', listingsArray)

    // await knex('images').insert([

    // ])

    await knex('likes').insert([
      {like_id: uuidv4(), likes_user_id: usersIdsArray[0], likes_listing_id: listingsIdsArray[0]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[1], likes_listing_id: listingsIdsArray[0]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[2], likes_listing_id: listingsIdsArray[0]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[0], likes_listing_id: listingsIdsArray[1]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[1], likes_listing_id: listingsIdsArray[1]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[2], likes_listing_id: listingsIdsArray[1]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[0], likes_listing_id: listingsIdsArray[2]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[1], likes_listing_id: listingsIdsArray[2]},
      {like_id: uuidv4(), likes_user_id: usersIdsArray[2], likes_listing_id: listingsIdsArray[2]},
    ])

  } catch (e) {
    console.error({msg: 'error from seeds file'}, e)
  }
  }

  