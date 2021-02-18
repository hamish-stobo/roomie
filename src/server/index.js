const environment = process.env.NODE_ENV || 'development'

const app = require('./app')
const port = process.env.PORT || 6969

const config = require('../../knexfile')[environment]
const conn = require('knex')(config)
require('dotenv').config()

const getUserColumns = async (db = conn) => {
    const userColumns = await db
        ('users')
        .select()

    
    process.env.USERS_FIELDS = await JSON.stringify(Object.keys(userColumns[0]))
}

app.listen(port, async function () {
 await getUserColumns()
 console.log(`🚀🚀🚀 App listening on port: ${port} 🚀🚀🚀`);
 console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
 console.log(`usersfields: ${process.env.USERS_FIELDS}`)
});