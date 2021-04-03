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
        }, ['user_id', 'email', 'first_name', 'last_name', 'user_location', 'profile_picture'])
        
        if(!userInsert[0] || JSON.stringify(userInsert[0]) === '{}') throw 'Insert of user failed'
        console.log(userInsert[0])
        userInsert[0].profile_picture = await convertToBase64(userInsert[0].profile_picture) 
        return userInsert[0]
    } catch (e) {
        console.error({msg: 'Error from createUser db function'}, e)
        throw `Error from createUser db function: ${JSON.stringify(e)}`
    }
}

const getUser = async (userID, db = conn) => {
    try {
        const profile = await db('users')
            .select('user_id', 'email', 'first_name', 'last_name', 'user_location', 'profile_picture', 'created_at')
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
        if(updateUser.length == 0 || JSON.stringify(updateUser[0]) == "{}") {
            console.error('Update user failed')
            return false
        }
        updateUser[0].profile_picture = await convertToBase64(updateUser[0].profile_picture) 
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

const deleteUser = async (user_id, db = conn) => {
    try {
        //we only update users table if it is provided to us:
        const likesDeleted = await db('likes')
            .del()
            .where('likes_user_id', user_id)
        let getListings = await db('listings')
            .where('listings_user_id', user_id)
            .select('listing_id')
        getListings = getListings.map(id => {
            const { listings_user_id } = id
            return listings_user_id
        })
        const images = getListings.forEach(async listing => 
            await db('images')
                .del()
                .where('images_listing_id', listing)
        )
        const delListings = await db('listings')
            .del()
            .where('listings_user_id', user_id)
        const users = await db('users')
            .del()
            .where('user_id', user_id)
        return `${users} users were deleted, along with ${delListings} listings, ${images} listing photos and ${likesDeleted} likes`
    } catch (e) {
        throw `Error from getAllUsers db function: ${JSON.stringify(e)}`
    }
}

const getUserFromEmail = async (email, db = conn) => {
    try {
        const getUser = db('users')
            .select('user_id', 'password')
            .where('email', email)
            .first()
        return getUser[0]
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    getAllUsers,
    deleteUser,
    getUserFromEmail
}
