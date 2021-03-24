const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const { v4: uuidv4 } = require('uuid')

const getAllLikes = async (type, db = conn) => {
    try {
        const formattedLikes = {}
        const userLikes = await db.select('likes_listing_id', 'likes_user_id').from('likes')
        userLikes.map(record => {
            const {likes_user_id, likes_listing_id} = record
            if(type === 'listings') {
                if(!formattedLikes.hasOwnProperty(likes_listing_id)) {
                    formattedLikes[likes_listing_id] = [likes_user_id]
                } else {
                    formattedLikes[likes_listing_id].push(likes_user_id)
                }
            } else if(type === 'users') {
                if(!formattedLikes.hasOwnProperty(likes_user_id)) {
                    formattedLikes[likes_user_id] = [likes_listing_id]
                } else {
                    formattedLikes[likes_user_id].push(likes_listing_id)
                }
            }
        })
        return formattedLikes
    } catch(e) {
        return Error(`Error from getAllLikes: ${e}`)
    }
}

const getAllLikesForOne = async (id, type, db = conn) => {
    try {
        let returningLikes = []
        switch (type) {
        case 'user':
            //get all the listings where a user has left likes
            const userLikes = await db('likes')
            .select('likes_listing_id')
            .where('likes_user_id', id)
            returningLikes.push(...userLikes)
            break
        case 'listing':
            //get all user_ids of likes left for a particular listing
            const listingLikes = await db('likes')
            .select('likes_user_id')
            .where('likes_listing_id', id)
            returningLikes.push(...listingLikes)
            break
        default:
            throw 'Invalid type argument provided to getAllLikesForOne'
        }
        if(returningLikes.length > 0) {
            returningLikes = returningLikes.map(likeObj => {
                let like
                for(const prop in likeObj) {
                    like = likeObj[prop]
                }
                return like
            })
        }
        console.log(`returningLikes ${returningLikes}`)
        return returningLikes
    } catch (e) {
        console.error({msg: 'Error from getAllLikesForOne'}, e)
        return Error('Error from getAllLikesForOne')
    }
}

const addLike = async (likes_user_id, likes_listing_id, db = conn) => {
    try {
        const checkLike = await db('likes')
            .select()
            .where({
                likes_user_id,
                likes_listing_id
            })
        if(checkLike.length > 0) throw Error ('Like already exists for this user on this listing')
        const likeInsert = await db('likes')
            .insert({
                like_id: uuidv4(), 
                likes_user_id, 
                likes_listing_id
            }, ['like_id', 'likes_user_id', 'likes_listing_id'])
        
        console.log(`like inserted successfully! ${JSON.stringify(likeInsert[0])}`)
        
        return likeInsert[0]
    } catch (e) {
        console.error(`Error in addLikes DB function ${e}`)
        throw e
    }
}

const removeLike = async (likes_user_id, likes_listing_id, db = conn) => {
    try {
        const likeDeletion = await db('likes')
            .del()
            .where({
                likes_user_id,
                likes_listing_id
            })
        if(likeDeletion == 0) throw Error(`${likeDeletion} likes were deleted`)
        return `Success! Like was removed ${likeDeletion}`
    } catch (e) {
        console.error(e)
        throw e
    }
}

//not used - makes a query for each item in listingsArr, 
//making for a too many connections error.

// const getAllLikesPerListing = async (listingsArr, db = conn) => {
//     try {
//         //get all the users likes
//         const likes = await db
//             .select('likes.user_id', 'likes.listing_id')
//             .from('listings')
//             .join('likes', 'likes.listing_id', '=', 'listings.id')
        
//         //we add this return before trying to loop over the likes array, so we account for
//         //if there are no likes found in the likes table.
//         if(likes.length == 0) {
//             return listingsArr
//         }
//         //if there are listings found, do some crazy shiet:
        
//         //loop over likes array
//         likes.map(like => {
//             //find the position in the listings array to insert the array of likesed users for that listing
//             let indexToChange = listingsArr.findIndex(listing => listing.listing_id == like.listing_id)
//             let listing = listingsArr[indexToChange]            
//             //if the current listing doesn't have any likes, and there are some to add, add them
//             if(!listing.hasOwnProperty('likesArr')) {
//                     listing.likesArr = like.user_id && [{user_id: like.user_id}]
//             } 
//             //if the current listing DOES have likesArr, and there are some to add, add them
//             else {
//                 if(listing.hasOwnProperty('likesArr')){
//                     like.user_id && listing.likesArr.push({user_id: like.user_id})
//                 }
//             }
//         })
//         return listingsArr
//     } catch (e) {
//         console.error({msg: 'Error from selectAlllistings db function'}, e)
//         return false
//     }
// }

module.exports = {
    getAllLikesForOne,
    getAllLikes,
    addLike,
    removeLike
}