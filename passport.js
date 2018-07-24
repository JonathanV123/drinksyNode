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
    // Instantiate a new collection 
    User_Model.forge({ id: jwt.payload.user_id }).fetch().then(res => {
        next(null, res);
    })
});
passport.use(strategy);
