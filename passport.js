const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { User_Model } = require('./db/Models/UserModel');

const options = {
    // Read JWT from Authorization http headers of each request with scheme 'bearer'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Secret that tokens are signed with
    secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(options, (jwt, next) => {
    console.log('Pew pew pew pew pew pew pew')
    // Instantiate a new collection 
    console.log("STRATEGY IN PASSPORT.JS HAS STARTED");
    console.log(jwt);
    User_Model.forge({ id: jwt.payload.user_id }).fetch().then(res => {
        console.log(res);
        next(null, res);
    })
    console.log("STRATEGY IN PASSPORT.JS HAS ENDED");
});
console.log("USER IN PASSPORT.JS HAS ENDED");

passport.use(strategy);
