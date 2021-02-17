const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesForOne = require('./likes').getAllLikesForOne
const { v4: uuidv4 } = require('uuid')

const createUser = async (userToInsert, db = conn) => {
    try {
    const { email, first_name, last_name, password, bio, suburb } = userToInsert
    const postcode = parseInt(userToInsert.postcode)
    const userInsert = await db('users').insert({
        id: uuidv4(), 
        email, 
        first_name, 
        last_name, 
        password, 
        bio
    }, ['id'])
    const locationInsert = await db('location').insert([
        {id: uuidv4(), suburb, postcode, user_id: userInsert[0].id}
      ], ['id'])
    if(!userInsert) throw Error('insert of user failed')
    if(!locationInsert) throw Error('insert of user location failed')
    return userInsert[0]
    } catch (e) {
        console.error({msg: 'Error from createUser db function'}, e)
        return false
    }
    
}

const getUser = async (userID, db = conn) => {
    try {
        const profileArr = await db
            .select('user_id', 'email', 'first_name', 'last_name', 'bio')
            .from('users')
            .where('users.id', userID)
            .join('location', 'user_id', '=', 'users.id')
            .whereNull('location.listing_id')
            .select('suburb', 'postcode')
        
        if(profileArr == []) {
            return {}
        }
        const profile = profileArr[0]
        profile.likedListings = await getAllLikesForOne(profile.user_id, 'user')
        return profile
    } catch (e) {
        console.error({msg: 'Error from getUser db function'}, e)
        return false
    }
}

const updateUser = async (userID, user, db = conn) => {
    const updateUser = await db('users')
        .where('id', userID)
        .update({...user}, ['email', 'first_name', 'last_name', 'bio'])
    console.log(`updateUser ${updateUser}`)
    return updateUser[0]
}

module.exports = {
    createUser,
    getUser,
    updateUser
}
