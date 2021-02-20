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
    }, ['id', 'email', 'first_name', 'last_name', 'bio'])
    const locationInsert = await db('location').insert([
        {id: uuidv4(), suburb, postcode, user_id: userInsert[0].id}
      ], ['suburb', 'postcode'])
    if(!userInsert) throw Error('insert of user failed')
    if(!locationInsert) throw Error('insert of user location failed')
    return { ...userInsert[0], ...locationInsert[0] }
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
    try {
        const { 
            email,
            first_name,
            last_name,
            bio,
            suburb,
            postcode
        } = user
        const updateUser = await db('users')
            .where('id', userID)
            .update({email, first_name, last_name, bio}, ['email', 'first_name', 'last_name', 'bio'])
        const updateLocation = await db('location')
            .where('user_id', userID)
            .update({suburb, postcode}, ['user_id', 'suburb', 'postcode'])
        console.log(`updateUser ${updateUser}`)
        console.log(`updateLocation  ${updateLocation}`)
        return { ...updateUser[0], ...updateLocation[0]}
    } catch (e) {
        console.error({msg: "error in updateUser"}, e)
        return false
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}
