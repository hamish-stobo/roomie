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
        listing_image = `data:image/jpeg;base64,${Buffer.from(listing_image).toString('base64')}`
        !imagesObj.hasOwnProperty(images_listing_id)
            ? imagesObj[images_listing_id] = [listing_image]
            : imagesObj[images_listing_id].push(listing_image)
    })
    const likesObj = await getAllLikes('listings')
    const usersIds = {}
    const users = await db('users').select()
    users.map((user, idx) => { 
        const { user_id } = user
        usersIds[user_id] = idx
    })
    const listings = listingsArr.map(listing => {
        const { listing_id, listings_user_id } = listing
        const userIndex = usersIds[listings_user_id]
        !!likesObj[listing_id]
            ? listing.userLikes = likesObj[listing_id]
            : listing.userLikes = []
        !!imagesObj[listing_id]
            ? listing.listing_photos = imagesObj[listing_id]
            : listing.listing_photos = []
        listing.author = users[userIndex]
        listing.author.profile_picture = `data:image/jpeg;base64,${Buffer.from(listing.author.profile_picture).toString('base64')}`
        return listing
    })
    const userProfile = users[1].profile_picture
    const userProfileFromListing = listings[0].author.profile_picture
    let buf1 = `data:image/jpeg;base64,${Buffer.from(userProfile).toString('base64')}`
    let buf2 = `data:image/jpeg;base64,${Buffer.from(userProfileFromListing).toString('base64')}`
    console.log(buf1 === buf2)
    return listings
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        return false
    }
}

const createListing = async (user_id, listing, photos, db = conn) => {
    try {
        console.log(user_id, JSON.stringify(listing), photos)
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
            const imagesToInsert = Array.isArray(photos)
                ? photos.map(photo => {
                    return {
                        image_id: uuidv4(),
                        images_listing_id: listing_id,
                        listing_image: photo
                    }
                })
                :  {
                    image_id: uuidv4(),
                    images_listing_id: listing_id,
                    listing_image: photos
                }
            const imagesInsert = await db('images').insert(imagesToInsert, ['image_id', 'images_listing_id', 'listing_image'])
            console.log(JSON.stringify(`Insert of photos succeeded: ${imagesInsert}`))
            return 'Listing inserted successfully'
        }
    } catch (e) {
        console.error({msg: 'Error from createListing DB function'}, e)
        throw Error(e)
    }
}

const deleteListing = async (listing_id, db = conn) => {
    try {
        console.log(`listing to remove: ${listing_id}`)
        const listingImagesDeletion = await db('images')
            .del()
            .where('images_listing_id', listing_id)
        if(listingImagesDeletion == 0) throw `${listingDeletion} listingsImages were deleted`
        const listingDeletion = await db('listings')
            .del()
            .where('listing_id', listing_id)
        if(listingDeletion == 0) throw `${listingDeletion} listings were deleted`
        return `Success! Listing was removed ${listingDeletion}`
    } catch (e) {
        console.error(e)
        throw e
    }
}

module.exports = {
    getListing,
    getAllListings,
    createListing,
    deleteListing
}