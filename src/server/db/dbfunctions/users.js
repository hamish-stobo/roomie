const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const getAllLikesForOne = require('./likes').getAllLikesForOne
const { v4: uuidv4 } = require('uuid')
const { formatObject } = require('../../validation/dataValidator')

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
        const profile = await db
            .select('users_id', 'email', 'first_name', 'last_name', 'bio')
            .first()
            .from('users')
            .where('users_id', userID)
            .join('locations', 'locations_user_id', '=', 'users_id')
            .whereNull('locations_listing_id')
            .select('suburb', 'postcode')
            .first()
        
        if(JSON.stringify(profile) === '{}') {
            throw Error('no profile found')
        }
        profile.likes = getAllLikesForOne(userID, 'user')
        // JSON.stringify(likes) === '{}' || !likes
        //     ? profile.likes = []
        //     : profile.likes
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
        let returnObj = {}
        //we only update users table if it is provided to us:
        if(!!users) {
            const updateUser = await db('users')
                .where('id', userID)
                .update({...users}, ['email', 'first_name', 'last_name', 'bio'])
            returnObj = {...returnObj,user: {...updateUser[0]}}
        }
        //we only update location table if it is provided to us:
        if(!!location) {
            //if property "postcode" is not null, run type conversion on it
            if(!!location.postcode) {
                location.postcode = parseInt(location.postcode)
            }
            const updateLocation = await db('location')
                .where('user_id', userID)
                .update({...location}, ['suburb', 'postcode'])
            
            returnObj = {...returnObj, location: {...updateLocation[0]}}
            } 
        return returnObj
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
