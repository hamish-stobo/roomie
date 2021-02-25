const environment = process.env.NODE_ENV || 'development'
require('dotenv').config()
const config = require('../../../knexfile')[environment]
const conn = require('knex')(config)

//this function is run when the app starts.
//it pulls the column names and data types of those columns,
//and stores them in .env variables.

const storeFieldsInfo = async (tables, db = conn) => {
    tables.forEach( async table => {
        const getFieldsInfo = await db.select('column_name', 'data_type')
        .from('information_schema.columns')
        .whereRaw(`table_name = \'${table}\'`)
        const storageObject = {}
        getFieldsInfo.map(item => {
        const { column_name, data_type } = item
        storageObject[column_name] = data_type
        })
        switch (table) {
            case 'users':
                process.env.USERS_FIELDS = JSON.stringify(storageObject)
                console.log(`${table} fieldsInfo: ${process.env.USERS_FIELDS}`)
                break;
            case 'listings':
                process.env.LISTINGS_FIELDS = JSON.stringify(storageObject)
                console.log(`${table} fieldsInfo: ${process.env.LISTINGS_FIELDS}`)
                break;
            case 'locations':
                process.env.LOCATIONS_FIELDS = JSON.stringify(storageObject)
                console.log(`${table} fieldsInfo: ${process.env.LOCATIONS_FIELDS}`)
                break;
            case 'likes':
                process.env.LIKES_FIELDS = JSON.stringify(storageObject)
                console.log(`${table} fieldsInfo: ${process.env.LIKES_FIELDS}`)
                break;
        }
    })
}

module.exports = storeFieldsInfo