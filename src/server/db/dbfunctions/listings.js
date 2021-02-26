const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const { getAllLikes } = require('./likes')

const getListing = async (listingId, db = conn) => {
    try {
        const listingArr = await db
            .select('listings_id', 'listings_user_id', 'rent', 'description')
            .from('listings')
            .where('listings_id', listingId)
            .join('location', 'listings_id', '=', 'listings.id')
            .whereNull('location.user_id')
            .select('suburb', 'postcode')
        if(listingArr == []) {
            return []
        }
        return listings
    } catch (e) {
        console.error({msg: 'Error from getListing DB function'}, e)
        return false
    }
}

const getAllListings = async (db = conn) => {
    try {
    const listingsArr = await db
        .select('listings_user_id', 'listings_id', 'rent', 'description')
        .from('listings')
        .join('locations', 'locations_listing_id', '=', 'listings_id')
        .whereNull('locations_user_id')
        .select('suburb', 'postcode')
    const likesObj = await getAllLikes('listings', db)
    const listings = listingsArr.map(listing => {
        const { listings_id } = listing
        !!likesObj[listings_id] 
            ? listing.userLikes = likesObj[listings_id]
            : listing.userLikes = []
        return listing
    })
    return listings
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        return false
    }
}

module.exports = {
    getListing,
    getAllListings
}