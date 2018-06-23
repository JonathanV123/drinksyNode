const env = process.env.NODE_ENV || 'development';
const knex = require('knex');
const config = require('./knexfile');
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const knexDb = knex({ client: config[env].client, connection: config[env].connection });
const db = bookshelf(knexDb);
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
db.plugin(securePassword);

console.log("USER IN PASSPORT.JS HAS STARTED");
exports.User = db.Model.extend({
    tableName: 'users',
    hasSecurePassword: true
})
console.log("USER IN PASSPORT.JS HAS STARTED");

const options = {
    // Read JWT from Authorization http headers of each request with scheme 'bearer'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Secret that tokens are signed with
    secretOrKey: process.env.SECRET_OR_KEY
};

passport.use(new JwtStrategy(options, (jwt_payload, next) => {
    // Instantiate a new collection 
    console.log("STRATEGY IN PASSPORT.JS HAS STARTED");
    const whatIsThis = User.forge({ id: jwt_payload.id }).fetch().then(res => {
        next(null, user);
    })

    console.log(whatIsThis);
    console.log("STRATEGY IN PASSPORT.JS HAS ENDED");
}));
