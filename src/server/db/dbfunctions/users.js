const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesForOne = require('./likes').getAllLikesForOne

const getUser = async (first_name, db = conn) => {
    try {
        const profileArr = await db
            .select('user_id', 'email', 'first_name', 'last_name', 'bio')
            .from('users')
            .where('first_name', first_name)
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
    }
}

const updateUser = async (first_name, user, db = conn) => {
    try {
        const updateUser = await db('users')
            .where('first_name', first_name)
            .update({...user}, ['email', 'first_name', 'last_name', 'bio'])
        console.log(`updateUser ${updateUser}`)
        return updateUser
    } catch (e) {
        console.error({msg: 'Error from updateUser db function'}, e)
    }
}

module.exports = {
    getUser,
    updateUser
}
