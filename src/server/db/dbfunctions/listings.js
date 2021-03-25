const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const bytea = require('postgres-bytea')
const { v4: uuidv4 } = require('uuid')
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
        listing.userLikes = !!listingLikes ? listingLikes : []
        const images = await db('images')
            .select('listing_image')
            .where('images_listing_id', listingId)

        listing.images = !!images ? images : []
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
    const imagesObj = {}
    const images = await db('images').select('images_listing_id', 'listing_image')
    images.map(image => {
        let { images_listing_id, listing_image } = image
        console.log(listing_image)
        listing_image = `data:image/jpeg;base64,${Buffer.from(listing_image).toString('base64')}`
        !imagesObj.hasOwnProperty(images_listing_id)
            ? imagesObj[images_listing_id] = [listing_image]
            : imagesObj[images_listing_id].push(listing_image)
    })
    const likesObj = await getAllLikes('listings', db)
    const listings = listingsArr.map(listing => {
        const { listing_id } = listing
        !!likesObj[listing_id]
            ? listing.userLikes = likesObj[listing_id]
            : listing.userLikes = []
        !!imagesObj[listing_id]
            ? listing.listing_photos = imagesObj[listing_id]
            : listing.listing_photos = []
        return listing
    })
    return listings
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        return false
    }
}

const createListing = async (user_id, listing, photos, db = conn) => {
    try {
        console.log(user_id, JSON.stringify(listing), ...photos)
        const listing_id = uuidv4()
        const listingInsert = await db('listings').insert({
            listing_id,
            listings_user_id: user_id,
            ...listing,
        }, ['listing_id'])
        
        if(!listingInsert || JSON.stringify(listingInsert) === '{}') {
            throw Error('Insert of listing failed')
        }
        else {
            console.log(JSON.stringify(`Insert of listing succeeded: ${JSON.stringify(listingInsert)}`))
            const imagesToInsert = photos.map(photo => {
                return {
                    image_id: uuidv4(),
                    images_listing_id: listing_id,
                    listing_image: photo
                }
            })
            const imagesInsert = await db('images').insert(imagesToInsert, ['image_id', 'images_listing_id', 'listing_image'])
            console.log(JSON.stringify(`Insert of photos succeeded: ${imagesInsert}`))
        }

        return 'Listing inserted successfully'
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        throw Error(JSON.stringify(e))
    }
}

module.exports = {
    getListing,
    getAllListings,
    createListing
}