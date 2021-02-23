const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const likesFunctions = require('./likes')

const getListing = async (listingId, db = conn) => {
    try {
        const listingArr = await db
            .select('listing_id', 'user_id', 'rent', 'description')
            .from('listings')
            .where('listing_id', listingId)
            .join('location', 'listing_id', '=', 'listings.id')
            .whereNull('location.user_id')
            .select('suburb', 'postcode')
        if(listingArr == []) {
            return []
        }
        const listing = listingArr[0]
        listing.userLikes = await likesFunctions.getAllLikesForOne(listing.listing_id, 'listing')
        return listing
    } catch (e) {
        console.error({msg: 'Error from getListing DB function'}, e)
        return false
    }
}

const getAllListings = async (db = conn) => {
    try {
    const ads = await db
        .select('rent', 'description')
        .from('listings')
        .join('location', 'listing_id', '=', 'listings.id')
        .whereNull('location.user_id')
        .select('suburb', 'postcode')
        .join('likes', 'likes.listing_id', '=', 'listings.id')
        .select('likes.user_id')
        .groupBy("likes.listing_id")
    console.log(ads)
    return ads
    if(ads.length == 0) return ads
    return likesFunctions.getAllLikesPerListing(ads)
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        return false
    }
}

module.exports = {
    getListing,
    getAllListings
}