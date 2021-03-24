const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const fileUpload = require('express-fileupload')
const getAllLikesForOne = require('./likes').getAllLikesForOne
const { v4: uuidv4 } = require('uuid')
const { formatObject } = require('../../validation/dataValidator')



const createUser = async (userToInsert, db = conn) => {
    try {
        // delete userToInsert.profile_picture
        // const {user_id, email, password, first_name, last_name} = userToInsert
        // console.log(JSON.stringify(userToInsert))
        // return
        const userInsert = await db('users').insert({
            ...userToInsert,
            user_id: uuidv4(),
        }, ['user_id', 'email', 'password', 'first_name', 'last_name', 'user_location', 'profile_picture'])
        
        if(!userInsert || JSON.stringify(userInsert) === '{}') throw Error('Insert of user failed')
        console.log(userInsert)
        return userInsert[0]
    } catch (e) {
        console.error({msg: 'Error from createUser db function'}, e)
        throw Error(`Error from createUser db function: ${JSON.stringify(e)}`)
    }
}

const getUser = async (userID, db = conn) => {
    try {
        const profile = await db('users')
            .select()
            .where('user_id', userID)
            .first()
        
        if(JSON.stringify(profile) == '{}' || !profile) {
            console.error({msg: 'No profile found'})
            return false
        }
        const listingsLiked = await getAllLikesForOne(userID, 'user')
        profile.listingsLiked = !!listingsLiked ? listingsLiked : []
        return profile
    } catch (e) {
        console.error({msg: 'Error from getUser db function'}, e)
        return false
    }
}

const updateUser = async (userID, user, db = conn) => {
    try {
        //we only update users table if it is provided to us:
        const updateUser = await db('users')
            .where('user_id', userID)
            .update({...user}, ['email', 'first_name', 'last_name', 'user_location', 'profile_picture'])
        console.log(JSON.stringify(updateUser))
        if(updateUser.length == 0 || JSON.stringify(updateUser[0]) == "{}") {
            console.error('Update user failed')
            return false
        }
        return updateUser[0]
    } catch (e) {
        console.error({msg: "error in updateUser"}, e)
        throw Error(`Error from updateUser db function: ${JSON.stringify(e)}`)
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}
