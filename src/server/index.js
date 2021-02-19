const environment = process.env.NODE_ENV || 'development'

const app = require('./app')
const port = process.env.PORT || 6969

const config = require('../../knexfile')[environment]
const conn = require('knex')(config)
require('dotenv').config()

const getUserColumns = async (table, db = conn) => {
    const getFieldsInfo = await db.select('column_name', 'data_type')
        .from('information_schema.columns')
        .whereRaw(`table_name = \'${table}\'`)
    return JSON.stringify(getFieldsInfo)
}

app.listen(port, async function () {
 process.env.USERS_FIELDS = await getUserColumns('users')
 console.log(`🚀🚀🚀 App listening on port: ${port} 🚀🚀🚀`);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
 console.log(`usersfields: ${process.env.USERS_FIELDS}`)
});