const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const bytea = require('postgres-bytea')
const { v4: uuidv4 } = require('uuid')
const { getAllLikes, getAllLikesForOne } = require('./likes')
const convertToBase64 = require('./binaryToBase64')
const { getAllUsers } = require('./users')

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
        listing.images = !!images ? await Promise.all(images.map(async image => await convertToBase64(image.listing_image))) : []
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
    images.map(async image => {
        let { images_listing_id, listing_image } = image
        listing_image = await convertToBase64(listing_image)
        !imagesObj.hasOwnProperty(images_listing_id)
            ? imagesObj[images_listing_id] = [listing_image]
            : imagesObj[images_listing_id].push(listing_image)
    })
    const likesObj = await getAllLikes('listings')
    const usersIds = {}
    const getUsers = await getAllUsers()
    getUsers.map((user, idx) => { 
        const { user_id } = user
        usersIds[user_id] = idx
    })
    const users = getUsers.map(async user => {
        const { profile_picture } = user
        user.profile_picture = await convertToBase64(profile_picture)
        return user
    })
    const listings = listingsArr.map(async (listing, idx) => {
        const { listing_id, listings_user_id } = listing
        const userIndex = usersIds[listings_user_id]
        !!likesObj[listing_id]
            ? listing.userLikes = likesObj[listing_id]
            : listing.userLikes = []
        !!imagesObj[listing_id]
            ? listing.listing_photos = imagesObj[listing_id]
            : listing.listing_photos = []
        listing.author = await users[userIndex]
        return listing
    })
    return Promise.all(listings)
    } catch (e) {
        console.error({msg: 'Error from get all listings DB function'}, e)
        throw e
    }
}

const createListing = async (user_id, listing, photos, db = conn) => {
    try {
        const listing_id = uuidv4()
        const listingInsert = await db('listings').insert({
            listing_id,
            listings_user_id: user_id,
            ...listing,
        })
        
        if(!listingInsert || JSON.stringify(listingInsert) === '{}') {
            throw 'Insert of listing failed'
        }
        else {
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
            return 'Listing inserted successfully'
        }
    } catch (e) {
        console.error({msg: 'Error from createListing DB function'}, e)
        throw e
    }
}

const updateListing = async (listing_id, body, photos, db = conn) => {
    try {
        const listingImagesDeletion = await db('images')
                .del()
                .where('images_listing_id', listing_id)
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
        const imagesInsert = await db('images')
            .insert(imagesToInsert, ['image_id', 'images_listing_id', 'listing_image'])
        const listingUpdate = await db('listings')
            .where('listing_id', listing_id)
            .update({...body})
        return 'Listing successfully updated'
    } catch (e) {
        console.error(e)
        throw e
    }
}

const deleteListing = async (listing_id, db = conn) => {
    try {
        // console.log(`listing to remove: ${listing_id}`)
        const likesDeletion = await db('likes')
            .del()
            .where('likes_listing_id', listing_id)
        const listingImagesDeletion = await db('images')
            .del()
            .where('images_listing_id', listing_id)
        if(listingImagesDeletion == 0) throw `${listingImagesDeletion} listingsImages were deleted`
        const listingDeletion = await db('listings')
            .del()
            .where('listing_id', listing_id)
        if(listingDeletion == 0) throw `${listingDeletion} listings were deleted`
        console.log(`Success! ${listingDeletion} listings were removed, it had ${listingImagesDeletion} photos and ${likesDeletion} likes`)
        return 'Success!'
    } catch (e) {
        console.error(e)
        throw e
    }
}

const getListingsLiked = async user_id => {
    try {
        const userLikes = await getAllLikesForOne(user_id, 'user')
        const listingIdsObj = {}
        userLikes.map((listingId, idx) => listingIdsObj[listingId] = idx)
        const allListings = await getAllListings()
        const filteredListings = allListings.filter(listing => listingIdsObj.hasOwnProperty(listing.listing_id))
        return filteredListings
    } catch(e) {
        console.error(e)
        throw e
    }
}

module.exports = {
    getListing,
    getAllListings,
    createListing,
    deleteListing,
    getListingsLiked,
    updateListing
}