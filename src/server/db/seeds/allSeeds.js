const { v4: uuidv4 } = require('uuid')

//function to pull Ids from the array of id objects returned from the select query
const pullIds = (prop, selectArr) => {
    const idsArr = selectArr.map((idObj) => idObj[prop])
    return idsArr
}

exports.seed = async (knex) => {
    //clear out tables and insert mock data
    try {
        // alternative to promise chaining - using async/await syntax
        await knex('likes').del()
        await knex('images').del()
        await knex('listings').del()
        await knex('users').del()
        await knex('users').insert([
            {
                user_id: uuidv4(),
                email: 'hello@test1.com',
                first_name: 'John',
                last_name: 'Smith',
                password: 'test1',
                user_location: 'Glen Innes',
            },
            {
                user_id: uuidv4(),
                email: 'testemail@test2.com',
                first_name: 'Jane',
                last_name: 'Kelly',
                password: 'test2',
                user_location: 'Papakura',
            },
            {
                user_id: uuidv4(),
                email: 'myemail@test1.com',
                first_name: 'Jeremy',
                last_name: 'Brown',
                password: 'test3',
                user_location: 'Remuera',
            },
        ])
        const usersArray = await knex.select('user_id').from('users')
        const usersIdsArray = pullIds('user_id', usersArray)
        await knex('listings').insert([
            {
                listing_id: uuidv4(),
                listings_user_id: usersIdsArray[0],
                rent: Math.round(Math.random() * 200),
                listing_location: 'Orakei',
                tagline: 'Come join the team!',
                bathrooms: 1,
                bedrooms: 2,
            },
            {
                listing_id: uuidv4(),
                listings_user_id: usersIdsArray[1],
                rent: Math.round(Math.random() * 200),
                listing_location: 'Mission Bay',
                tagline: 'Room available immediately!',
                bathrooms: 2,
                bedrooms: 4,
            },
            {
                listing_id: uuidv4(),
                listings_user_id: usersIdsArray[2],
                rent: Math.round(Math.random() * 200),
                listing_location: 'Grey Lynn',
                tagline: 'Join our lovely flat!',
                bathrooms: 3,
                bedrooms: 3,
            },
        ])
        const listingsArray = await knex.select('listing_id').from('listings')
        const listingsIdsArray = pullIds('listing_id', listingsArray)

        // await knex('images').insert([

        // ])

        await knex('likes').insert([
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[0],
                likes_listing_id: listingsIdsArray[0],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[1],
                likes_listing_id: listingsIdsArray[0],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[2],
                likes_listing_id: listingsIdsArray[0],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[0],
                likes_listing_id: listingsIdsArray[1],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[1],
                likes_listing_id: listingsIdsArray[1],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[2],
                likes_listing_id: listingsIdsArray[1],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[0],
                likes_listing_id: listingsIdsArray[2],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[1],
                likes_listing_id: listingsIdsArray[2],
            },
            {
                like_id: uuidv4(),
                likes_user_id: usersIdsArray[2],
                likes_listing_id: listingsIdsArray[2],
            },
        ])
    } catch (e) {
        console.error({ msg: 'error from seeds file' }, e)
    }
}
