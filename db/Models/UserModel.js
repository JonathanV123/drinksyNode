const env = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('../../knexfile');
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const knexDb = knex({ client: config[env].client, connection: config[env].connection });

const db = bookshelf(knexDb);
db.plugin(securePassword);

exports.User = db.Model.extend({
    tableName: 'users',
    hasSecurePassword: true
})