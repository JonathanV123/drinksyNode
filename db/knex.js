const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const envConfig = config[env];
console.log(env);
const knex = require('knex');
console.log(envConfig);
const connection = knex(envConfig);

module.exports = connection;
