const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesForOne = require('./likes').getAllLikesForOne
const { v4: uuidv4 } = require('uuid')

const createUser = async (userToInsert, db = conn) => {
    try {
    const { users, location } = userToInsert
    const { suburb, postcode } = location
    const userInsert = await db('users').insert({
        ...users,
        id: uuidv4(),
    }, ['id', 'email', 'first_name', 'last_name', 'bio'])
    const locationInsert = await db('location').insert([
        {suburb, postcode: parseInt(postcode), id: uuidv4(), user_id: userInsert[0].id}
      ], ['suburb', 'postcode'])
    if(!userInsert) throw Error('insert of user failed')
    if(!locationInsert) throw Error('insert of user location failed')
    return { user: {...userInsert[0]}, location: {...locationInsert[0]} }
    } catch (e) {
        console.error({msg: 'Error from createUser db function'}, e)
        return false
    }
    
}

const getUser = async (userID, db = conn) => {
    try {
        const profileArr = await db
            .select('user_id', 'email', 'first_name', 'last_name', 'bio')
            .from('users')
            .where('users.id', userID)
            .join('location', 'user_id', '=', 'users.id')
            .whereNull('location.listing_id')
            .select('suburb', 'postcode')
        
        if(profileArr == []) {
            return {}
        }
        const profile = profileArr[0]
        profile.likedListings = await getAllLikesForOne(profile.user_id, 'user')
        return profile
    } catch (e) {
        console.error({msg: 'Error from getUser db function'}, e)
        return false
    }
}

const updateUser = async (userID, user, db = conn) => {
    try {
        const { 
            users, location
        } = user
        const updateUser = await db('users')
            .where('id', userID)
            .update({...users}, ['email', 'first_name', 'last_name', 'bio'])
        if(JSON.stringify(location) !== "{}") {
            //accounts for null fields in location object
            const getFieldsToAdd = prop => {
                for(const key in prop) {
                    if(!key) {
                        delete prop[key]
                    }
                    if(key === "postcode") {
                        prop[key] = parseInt(prop[key])
                    }
                }
                return prop
            }
            const updateLocation = await db('location')
                .where('user_id', userID)
                .update({...getFieldsToAdd(location)}, ['suburb', 'postcode'])
            
            return { user: {...updateUser[0]}, location: {...updateLocation[0]}}
        } else {
            return {user: {...updateUser[0]}}
        }
    } catch (e) {
        console.error({msg: "error in updateUser"}, e)
        return false
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}
