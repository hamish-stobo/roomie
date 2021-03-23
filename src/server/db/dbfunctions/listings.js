const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const { getAllLikes, getAllLikesForOne } = require('./likes')

const getListing = async (listingId, db = conn) => {
    try {
        const listingArr = await db('listings')
        .select()
        .where('listing_id', listingId)
        if(listingArr == []) {
            throw Error('No listing found :(')
        }
        const listing = listingArr[0]
        const listingLikes = await getAllLikesForOne(listingId, 'listing')
        listing.userLikes = listingLikes || []
        return listing
    } catch (e) {
        console.error({msg: 'Error from getListing DB function'}, e)
        return false
    }
}

const getAllListings = async (db = conn) => {
    try {
    const listingsArr = await db('listings')
        .select()

    const likesObj = await getAllLikes('listings', db)
    const listings = listingsArr.map(listing => {
        const { listing_id } = listing
        !!likesObj[listing_id]
            ? listing.userLikes = likesObj[listing_id]
            : listing.userLikes = []
        return listing
    })
    return listings
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        return false
    }
}

const createListing = async (listing, photos, db = conn) => {
    try {
        const userInsert = await db('listings').insert({
            ...listing,
            user_id: uuidv4(),
        }, ['listings_user_id', 'rent', 'listing_location', 'tagline', 'description', 'user_location', 'profile_picture'])
        
        if(!userInsert || JSON.stringify(userInsert) === '{}') throw Error('Insert of user failed')
        console.log(userInsert)
        return userInsert[0]
    })
    return listings
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        return false
    }
}

module.exports = {
    getListing,
    getAllListings,
    createListing
}