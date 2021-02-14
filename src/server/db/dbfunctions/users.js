const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getInterestsForUser = require('./likes').getInterestsForUser

const getUsers = async (db = conn) => {
    try {
        const response = await db('users')
        .select('location.listing_id','rent')
        return response
    } catch (e) {
        console.error({msg: 'Error from getUsers db function'}, e)
    }
}

module.exports = {
    getUsers
}

const selectAllads = async (db = conn) => {
    const ads = await db
        .select('location.listing_id','rent')
        .from('advertisements')
        .join('location', 'listing_id', '=', 'advertisements.id')
        .whereNull('location.user_id')
    if(ads.length == 0) return ads
    return getInterestsForAds(ads)
}

module.exports = {
    selectAllads
}
