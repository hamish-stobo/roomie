const environment = process.env.NODE_ENV || 'development'
require('dotenv').config()
const config = require('../../../knexfile')[environment]
const conn = require('knex')(config)

//this function is run when the app starts.
//it pulls the column names and data types of those columns,
//and stores them in .env variables.

const storeFieldsInfo = async (table, db = conn) => {
    let {
        USERS_FIELDS,
        LISTINGS_FIELDS,
        LOCATIONS_FIELDS,
        LIKES_FIELDS
    } = process.env
    const getFieldsInfo = await db.select('column_name', 'data_type')
        .from('information_schema.columns')
        .whereRaw(`table_name = \'${table}\'`)
    const storageObject = {}
    const forENVvarStorage = getFieldsInfo.map(item => {
        const { column_name, data_type } = item
        storageObject[column_name] = data_type
        
    })

    switch (table) {
        case 'users':
            USERS_FIELDS = JSON.stringify(storageObject)
            console.log(`${table} fieldsInfo: ${USERS_FIELDS}`)
            break;
        case 'listings':
            LISTINGS_FIELDS = JSON.stringify(storageObject)
            console.log(`${table} fieldsInfo: ${LISTINGS_FIELDS}`)
            break;
        case 'location':
            LOCATIONS_FIELDS = JSON.stringify(storageObject)
            console.log(`${table} fieldsInfo: ${LOCATIONS_FIELDS}`)
            break;
        case 'likes':
            LIKES_FIELDS = JSON.stringify(storageObject)
            console.log(`${table} fieldsInfo: ${LIKES_FIELDS}`)
            break;
    }
}

module.exports = storeFieldsInfo