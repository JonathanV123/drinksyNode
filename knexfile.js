require('dotenv').config({ path: 'variables.env' })
const connectionStringProduction = process.env.PG_CONNECTION_STRING_PRODUCTION;

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@127.0.0.1:5432/restaurants',
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
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
