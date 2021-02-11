const environment = process.env.NODE_ENV || 'development'
const config = require('../../../knexfile')[environment]
const conn = require('knex')(config)
const { v4: uuidv4 } = require('uuid')

const getUsers = async (db = conn) => {
    try {
        const response = await db('users').select()
        return response
    } catch (e) {
        console.error({msg: 'Error from getUsers db function'}, e)
    }
}

const selectAllAds = async (db = conn) => {
    try {
        const response = await db('advertisements').select()
        return response
    } catch (e) {
        console.error({msg: 'Error from selectAllAds db function'}, e)
    }
}

module.exports = {
    getUsers,
    selectAllAds
}
