require('dotenv').config({ path: 'variables.env' })
const connectionString = process.env.PG_CONNECTION_STRING;
console.log(connectionString);
module.exports = {
  development: {
    client: 'pg',
    connection: connectionString
  },
  test:{
    client: 'pg',
    connection: 'postgres://postgres:postgres@127.0.0.1:5432/test-restaurants'
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
