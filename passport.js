const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { User } = require('./db/Models/UserModel');


console.log("USER IN PASSPORT.JS HAS STARTED");
const options = {
    // Read JWT from Authorization http headers of each request with scheme 'bearer'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Secret that tokens are signed with
    secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(options, (jwt, next) => {
    // Instantiate a new collection 
    console.log("STRATEGY IN PASSPORT.JS HAS STARTED");
    console.log(jwt.payload.id)
    User.forge({ id: jwt.payload.id }).fetch().then(res => {
        console.log("WTF IS GOING ON!?")
        next(null, res);
    })

    console.log("STRATEGY IN PASSPORT.JS HAS ENDED");
});
console.log("USER IN PASSPORT.JS HAS ENDED");

passport.use(strategy);
