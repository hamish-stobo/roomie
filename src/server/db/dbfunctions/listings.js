const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesForOne = require('./likes').getAllLikesForOne

const getListing = async (listingId, db = conn) => {
    try {
        const listingArr = await db
            .select('listing_id', 'rent', 'description')
            .from('listings')
            .where('listing_id', listingId)
            .join('location', 'listing_id', '=', 'listings.id')
            .whereNull('location.user_id')
            .select('suburb', 'postcode')
        if(listingArr == []) {
            return []
        }
        const listing = listingArr[0]
        listing.userLikes = await getAllLikesForOne(listing.listing_id, 'listing')
        return listing
    } catch (e) {
        console.error({msg: 'Error from getListing DB function'}, e)
    }
}

module.exports = {
    getListing
}