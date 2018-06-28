const { User_Model } = require('../db/Models/UserModel');
const jwt = require('jsonwebtoken');

exports.create_user = async (req, res, next) => {
    if (!req.body.email || !req.body.password_digest) {
        return res.status(401).send('No Fields')
    }
    // Create user in the DB
    const user_creation = await new User_Model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password_digest
    })
    // Save User to DB
    const saved_user = await user_creation.save();
    // Find user saved in DB with email
    const query_user = await User_Model.forge({ email: req.body.email }).fetch();
    if (!query_user) {
        return res.status(400).send('user not found')
    }
    // user.authenticate is the secure password plugin.
    // Authenticate password
    // const user_from_db = await query_user.authenticate(req.body.password_digest);
    // if(!user_from_db){
    //     return res.status(400).send('Password does not match')
    // }
    const user_email = query_user.attributes.email;
    const user_id = query_user.id;
    if (query_user) {
        const payload = {
            user_id: user_id,
            user_email: user_email,
        };
        const token = jwt.sign({
            payload: payload,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, process.env.SECRET_OR_KEY)
        res.json({
            user: saved_user,
            token: token
        })
    }
}

exports.login = async (req, res, next) => {
res.send('Yeah Nice Job')
}