const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesPerListing = require('./likes').getAllLikesPerListing

const selectAllListings = async (db = conn) => {
    const ads = await db
        .select('location.listing_id','rent', 'description')
        .from('listings')
        .join('location', 'listing_id', '=', 'listings.id')
        .whereNull('location.user_id')
        .select('suburb', 'postcode')
    if(ads.length == 0) return ads
    return getAllLikesPerListing(ads)
}

module.exports = {
    selectAllListings
}