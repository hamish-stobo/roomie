require('dotenv').config()
const { Client } = require('pg')

const PGclient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
    client,
    connection: PGclient,
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
