const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)
const fileUpload = require('express-fileupload')
const getAllLikesForOne = require('./likes').getAllLikesForOne
const { v4: uuidv4 } = require('uuid')
const { formatObject } = require('../../validation/dataValidator')
const convertToBase64 = require('./binaryToBase64')

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
            throw Error('No profile found')
        }
        const { profile_picture } = profile
        profile.profile_picture = await convertToBase64(profile_picture)
        
        return profile
    } catch (e) {
        console.error('Error in getUser', e)
        throw e
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

const getAllUsers = async (db = conn) => {
    try {
        //we only update users table if it is provided to us:
        const users = db('users').select()
        return users
    } catch (e) {
        throw Error(`Error from getAllUsers db function: ${JSON.stringify(e)}`)
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    getAllUsers
}
