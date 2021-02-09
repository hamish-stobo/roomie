const environment = process.env.NODE_ENV || 'development'
const config = require('../../../knexfile')[environment]
const connection = require('knex')(config)
const { v4: uuidv4 } = require('uuid')

const getUsers = async (db = connection) => {
    try {
        const response = await db('users').select()
        return response
    } catch (e) {
        console.error(e)
    }
}

const manualAdvertisementsSeed = async (db = connection) => {
    try {
        const userResponse = await db('users').select()
        const whoKnows = userResponse.forEach( async user => {
            try {
                await db('advertisements')
                    .insert({id: uuidv4(), user_id: user.id, rent: Math.round(Math.random() * 100)})
            } catch (e) {
                console.error(e)
            }
        })
        const allAds = db('advertisements').select()
        return allAds
    } catch (e) {
        console.error(e)
    }
}



module.exports = {
    getUsers,
    manualAdvertisementsSeed
}