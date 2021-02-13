const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getInterestsForAds = require('./interests').getInterestsForAds

const selectAllads = async (db = conn) => {
    const ads = await db
        .select('location.advertisement_id','rent')
        .from('advertisements')
        .join('location', 'advertisement_id', '=', 'advertisements.id')
        .whereNull('location.user_id')
    if(ads.length == 0) return ads
    return getInterestsForAds(ads)
}

module.exports = {
    selectAllads
}