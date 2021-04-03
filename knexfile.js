require('dotenv').config()
const parse = require('pg-connection-string').parse
const pgconfig = parse(process.env.DATABASE_URL)
pgconfig.ssl = { rejectUnauthorized: false }

const knex = Knex({
  client: 'pg',
  connection: pgconfig,
})

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    }, 
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: pgconfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    }, 
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
