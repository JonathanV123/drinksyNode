require('dotenv').config({ path: 'variables.env' })
const connectionStringProduction = process.env.PG_CONNECTION_STRING_PRODUCTION;

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@127.0.0.1:5432/users',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@127.0.0.1:5432/restaurants-test',
    migrations: {
      directory: __dirname + '/db/migrations/testMigrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/testSeeds'
    }
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }

};
