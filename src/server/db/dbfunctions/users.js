const environment = process.env.NODE_ENV || 'development'
const config = require('../../../../knexfile')[environment]
const conn = require('knex')(config)

const getUsers = async (db = conn) => {
    try {
        const response = await db('users').select()
        return response
    } catch (e) {
        console.error({msg: 'Error from getUsers db function'}, e)
    }
}

module.exports = {
    getUsers
}

