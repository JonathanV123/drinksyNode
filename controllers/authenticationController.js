const passport = require('passport');
const { User } = require('../passport')
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    console.log("LOGIN IN PASSPORT.JS HAS STARTED");
    if (!req.body.email || !req.body.password) {
        return res.status(401).send('Fields not sent')
    }
    const user = await User.forge({ email: req.body.email }).fetch();
    if (!user) {
        return res.status(400).send('user not found')
    }
    // user.authenticate is the plugin
    const auth_User = await user.authenticate(req.body.password);
    const payload = { id: auth_User.id };
    const token = jwt.sign(payload, process.env.SECRET_OR_KEY)
    console.log("LOGIN IN PASSPORT.JS HAS ENDED");
    res.send(token);

}


exports.is_authorized = async (req, res, next) => {
    console.log("IS AUTHORIZED IN PASSPORT.JS HAS STARTED");
    // Retruns a middleware which runs the strategies. If one of the strategies succeeds, this will set req.user.
    const a = await passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Something is not right",
                user: user
            })
        }
    })
    console.log("AUTHORIZED IN PASSPORT.JS HAS ENDED");
    res.send('Unauthorized')
}