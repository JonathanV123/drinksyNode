const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const envConfig = config[env];
const knex = require('knex');
const connection = knex(envConfig);

module.exports = connection;
