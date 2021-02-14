const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesForOneUser = require('./likes').getAllLikesForOneUser

const getUser = async (first_name, db = conn) => {
    try {
        const user = await db
            .select('user_id', 'email', 'first_name', 'last_name', 'bio')
            .from('users')
            .where('users.first_name', first_name)
            .join('location', 'user_id', '=', 'users.id')
            .whereNull('location.listing_id')
            .select('suburb', 'postcode')
            return user[0]
        if(response == []) {
            return []
        }

    } catch (e) {
        console.error({msg: 'Error from getUser db function'}, e)
    }
}

module.exports = {
    getUser
}
