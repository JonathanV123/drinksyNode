const { User } = require('../db/Models/UserModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    console.log("LOGIN IN PASSPORT.JS HAS STARTED");
    if (!req.body.email || !req.body.password) {
        return res.status(401).send('Fields not sent')
    }
    // Instantiate new model 
    const query_user = await User.forge({ email: req.body.email }).fetch();
    if (!query_user) {
        return res.status(400).send('user not found')
    }
    // user.authenticate is the secure password plugin.
    const user = await query_user.authenticate(req.body.password).catch(error => {
        res.send("Invalid Password Please Try Again")
    });
    const user_email = user.attributes.email;
    if (user) {
        const payload = { id: id };
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            payload: payload
        }, process.env.SECRET_OR_KEY)
        res.send(token);
    }
}


exports.is_authorized = async (req, res, next) => {
    console.log(req.user);
    // Retruns a middleware which runs the strategies. If one of the strategies succeeds, this will set req.user.
    res.send('Im protected')
}