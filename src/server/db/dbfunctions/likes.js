const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const { v4: uuidv4 } = require('uuid')

const getAllLikes = async (type, db = conn) => {
    try {
        const formattedLikes = {}
        const userLikes = await db
            .select('likes_listing_id', 'likes_user_id')
            .from('likes')
        userLikes.map((record) => {
            const { likes_user_id, likes_listing_id } = record
            if (type === 'listings') {
                if (!formattedLikes.hasOwnProperty(likes_listing_id)) {
                    formattedLikes[likes_listing_id] = [likes_user_id]
                } else {
                    formattedLikes[likes_listing_id].push(likes_user_id)
                }
            } else if (type === 'users') {
                if (!formattedLikes.hasOwnProperty(likes_user_id)) {
                    formattedLikes[likes_user_id] = [likes_listing_id]
                } else {
                    formattedLikes[likes_user_id].push(likes_listing_id)
                }
            }
        })
        return formattedLikes
    } catch (e) {
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
        if (returningLikes.length > 0) {
            returningLikes = returningLikes.map((likeObj) => {
                let like
                for (const prop in likeObj) {
                    like = likeObj[prop]
                }
                return like
            })
        }
        return returningLikes
    } catch (e) {
        console.error({ msg: 'Error from getAllLikesForOne' }, e)
        return Error(`Error from getAllLikesForOne ${e}`)
    }
}

const addLike = async (likes_user_id, likes_listing_id, db = conn) => {
    try {
        const checkLike = await db('likes').select().where({
            likes_user_id,
            likes_listing_id,
        })
        if (checkLike.length > 0)
            throw Error('Like already exists for this user on this listing')
        const likeInsert = await db('likes').insert(
            {
                like_id: uuidv4(),
                likes_user_id,
                likes_listing_id,
            },
            ['like_id', 'likes_user_id', 'likes_listing_id']
        )

        return likeInsert[0]
    } catch (e) {
        console.error(`Error in addLikes DB function ${e}`)
        throw e
    }
}

const removeLike = async (likes_user_id, likes_listing_id, db = conn) => {
    try {
        const likeDeletion = await db('likes').del().where({
            likes_user_id,
            likes_listing_id,
        })
        if (likeDeletion == 0) throw Error(`${likeDeletion} likes were deleted`)
        return `Success! Like was removed ${likeDeletion}`
    } catch (e) {
        console.error(e)
        throw e
    }
}

module.exports = {
    getAllLikesForOne,
    getAllLikes,
    addLike,
    removeLike,
}
