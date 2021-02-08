module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DEV_DB_URL,
      user: process.env.DEV_DB_USERNAME,
      password: process.env.DEV_DB_PASSWORD
    },
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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
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
