require('dotenv').config()

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
    connection: process.env.DATABASE_URL,
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
