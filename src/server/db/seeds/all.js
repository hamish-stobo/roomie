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
    await knex('likes').del()
    await knex('location').del()
    await knex('listings').del()
    await knex('users').del()
    await knex('users').insert([
          {id: uuidv4(), email: 'hello@test1.com', first_name: 'John', last_name: 'Smith', password: 'test1', bio: 'Lo-fi humblebrag fam gastropub prism keytar single-origin coffee. Umami vexillologist la croix, polaroid bicycle rights etsy snackwave tofu locavore kinfolk. Paleo selvage crucifix disrupt. Aesthetic health goth tacos thundercats farm-to-table organic. Fashion axe waistcoat tattooed, lomo meggings offal vegan keytar keffiyeh lumbersexual mustache. Direct trade fingerstache next level bitters ennui tousled, palo santo hoodie la croix bicycle rights williamsburg. Slow-carb chia chartreuse intelligentsia.'},
          {id: uuidv4(), email: 'testemail@test2.com', first_name: 'Jane', last_name: 'Kelly', password: 'test2', bio: 'Fashion axe pickled lumbersexual +1 hammock. Selvage franzen lo-fi fam put a bird on it. Marfa fam blue bottle, viral paleo kickstarter scenester la croix wayfarers ethical master cleanse cliche. Vaporware organic hexagon, meh swag green juice gentrify before they sold out mustache air plant paleo. Sriracha pinterest 3 wolf moon selfies hot chicken, vinyl biodiesel pour-over distillery man braid shaman kogi snackwave edison bulb cold-pressed. Cardigan heirloom cloud bread, YOLO copper mug hammock health goth vexillologist fam post-ironic. Fanny pack street art messenger bag 8-bit, aesthetic hell of umami YOLO next level marfa woke raclette chicharrones post-ironic.'},
          {id: uuidv4(), email: 'myemail@test1.com', first_name: 'Jeremy', last_name: 'Brown', password: 'test3', bio: 'Glossier offal woke celiac. Mlkshk swag live-edge flexitarian raw denim roof party craft beer. Bicycle rights pickled pour-over mixtape direct trade intelligentsia. Truffaut you probably haven\'t heard of them organic sartorial, 8-bit tote bag artisan next level palo santo banjo flannel bicycle rights pop-up plaid. Offal chicharrones scenester, glossier butcher shaman neutra heirloom flannel live-edge meditation sustainable street art thundercats. Man bun cred live-edge craft beer, literally paleo hell of marfa tattooed migas lumbersexual hella williamsburg cardigan thundercats. Williamsburg farm-to-table pitchfork godard migas you probably haven\'t heard of them selvage occupy fingerstache mixtape flannel flexitarian.'}
      ])
    const usersArray = await knex.select('id').from('users')
    const usersIdsArray = pullIds(usersArray)
    await knex('listings').insert([
      {id: uuidv4(), user_id: usersIdsArray[0], rent: Math.round(Math.random() * 200), description: 'Bicycle rights locavore quinoa poke jean shorts portland hammock 3 wolf moon vape shaman heirloom next level cardigan chillwave vinyl. Disrupt DIY hella, YOLO post-ironic photo booth poutine jean shorts 8-bit fanny pack. Readymade YOLO austin hoodie cliche beard art party chambray kinfolk. Pitchfork pickled austin salvia iPhone descriptiondiesel post-ironic adaptogen celiac drinking vinegar live-edge palo santo blog pork belly umami. descriptiondiesel ugh banjo godard hoodie, squid cred woke narwhal. Microdosing dreamcatcher man braid actually air plant, selvage bespoke la croix godard copper mug affogato intelligentsia raclette.'},
      {id: uuidv4(), user_id: usersIdsArray[1], rent: Math.round(Math.random() * 200), description: 'Cliche messenger bag man braid, occupy yuccie tbh scenester lyft. Mlkshk four dollar toast salvia ramps fanny pack drinking vinegar literally enamel pin PBR&B. Heirloom bushwick photo booth pickled irony. Selvage man braid hella narwhal before they sold out.'},
      {id: uuidv4(), user_id: usersIdsArray[2], rent: Math.round(Math.random() * 200), description: 'Narwhal iPhone banjo pork belly normcore woke. VHS next level post-ironic keytar snackwave portland. Fashion axe vape +1 skateboard ugh. YOLO food truck put a bird on it semiotics, hexagon actually wolf knausgaard copper mug squid photo booth schlitz cornhole thundercats. Forage flexitarian 3 wolf moon chillwave. Vice pour-over before they sold out tumblr master cleanse asymmetrical.'}
    ])
    const listingsArray = await knex.select('id').from('listings')
    const listingsIdsArray = pullIds(listingsArray)
    //here we will alternate between inserting a location record for an ad,
    //and inserting a location record for a user
    //ad location records have null user_id, 
    //user location records have null ad_id
    await knex('location').insert([
      {id: uuidv4(), suburb: 'Manurewa', postcode: 2102, user_id: usersIdsArray[0]},
      {id: uuidv4(), suburb: 'Grey Lynn', postcode: 1021, listing_id: listingsIdsArray[0]},
      {id: uuidv4(), suburb: 'Takapuna', postcode: 0622, user_id: usersIdsArray[1]},
      {id: uuidv4(), suburb: 'Kohimarama', postcode: 1071, listing_id: listingsIdsArray[1]},
      {id: uuidv4(), suburb: 'Remuera', postcode: 1050, user_id: usersIdsArray[2]},
      {id: uuidv4(), suburb: 'Ellerslie', postcode: 1051, listing_id: listingsIdsArray[2]}
    ])
    await knex('likes').insert([
      {id: uuidv4(), user_id: usersIdsArray[0], listing_id: listingsIdsArray[0]},
      {id: uuidv4(), user_id: usersIdsArray[1], listing_id: listingsIdsArray[0]},
      {id: uuidv4(), user_id: usersIdsArray[2], listing_id: listingsIdsArray[0]},
      {id: uuidv4(), user_id: usersIdsArray[0], listing_id: listingsIdsArray[1]},
      {id: uuidv4(), user_id: usersIdsArray[1], listing_id: listingsIdsArray[1]},
      {id: uuidv4(), user_id: usersIdsArray[2], listing_id: listingsIdsArray[1]},
      {id: uuidv4(), user_id: usersIdsArray[0], listing_id: listingsIdsArray[2]},
      {id: uuidv4(), user_id: usersIdsArray[1], listing_id: listingsIdsArray[2]},
      {id: uuidv4(), user_id: usersIdsArray[2], listing_id: listingsIdsArray[2]},
    ])
  } catch (e) {
    console.error({msg: 'error from seeds file'}, e)
  }
  }

  