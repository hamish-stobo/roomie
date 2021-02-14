const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)

const getAllLikesForOne = async (id, type, db = conn) => {
    try {
        const returningLikes = []
        switch (type) {
        case 'user':
            //get all the listings where a user has left likes
            const userLikes = await db
            .select('listing_id')
            .from('likes')
            .where('user_id', id)
            
            returningLikes.push(...userLikes)
            break
        case 'listing':
            //get all user_ids of likes left for a particular listing
            const listingLikes = await db
            .select('user_id')
            .from('likes')
            .where('listing_id', id)
            returningLikes.push(...listingLikes)
            break
        default:
            throw 'Invalid type argument provided to getAllLikesForOne'
        }
        return returningLikes
    } catch (e) {
        console.error({msg: 'Error from getAllLikesForOne'}, e)
    }
}

const getAllLikesPerListing = async (listingsArr, db = conn) => {
    try {
        //get all the users likes
        const likes = await db
            .select('likes.user_id', 'likes.listing_id')
            .from('listings')
            .join('likes', 'likes.listing_id', '=', 'listings.id')
        
        //we add this return before trying to loop over the likes array, so we account for
        //if there are no likes found in the likes table.
        if(likes.length == 0) {
            console.log('no likes yo')
            return listingsArr
        }
        //if there are listings found, do some crazy shiet
        console.log(JSON.stringify(listingsArr))
        console.log(JSON.stringify(likes))
        //loop over likes array
        likes.map(like => {
            //find the position in the listings array to insert the array of likesed users for that listing
            console.log(`likes: ${JSON.stringify(like)}`)
            let indexToChange = listingsArr.findIndex(listing => listing.listing_id == like.listing_id)
            console.log(`indexToChange: ${JSON.stringify(indexToChange)}`)

            let listing = listingsArr[indexToChange]
            console.log(`listing: ${JSON.stringify(listing)}`)
            
            //if the current listing doesn't have any likes, and there are some to add, add them
            if(!listing.hasOwnProperty('likesArr')) {
                    listing.likesArr = like.user_id && [{user_id: like.user_id}]
            } 
            //if the current listing DOES have likesArr, and there are some to add, add them
            else {
                if(listing.hasOwnProperty('likesArr')){
                    like.user_id && listing.likesArr.push({user_id: like.user_id})
                }
            }
        })
        return listingsArr
    } catch (e) {
        console.error({msg: 'Error from selectAlllistings db function'}, e)
    }
}

module.exports = {
    getAllLikesPerListing,
    getAllLikesForOne
}