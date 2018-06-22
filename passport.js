const env = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('./knexfile');
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const knexDb = knex({ client: config[env].client, connection: config[env].connection });
const db = bookshelf(knexDb);
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
db.plugin(securePassword);

exports.User = db.Model.extend({
    tableName: 'users',
    hasSecurePassword: true
})

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

exports.strategy = new JwtStrategy(opts, (payload, next) => {
    //TODO: GET USER FROM DB
    User.forge({ id: payload.id }).fetch().then(res => {
        next(null, user);
    })
})