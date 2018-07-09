const { User_Model } = require('../db/Models/UserModel');
const jwt = require('jsonwebtoken');

exports.create_user = async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password_digest) {
        return res.status(401).send({ message: 'Please Enter a Name, Email, and Password' })
    }
    // Check if email exists
    const check_email = await User_Model.forge({ email: req.body.email }).fetch();
    if (check_email) {
        return res.status(400).send({ message: 'An account with this email address already exists' })
    } else {
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
            return res.status(400).send({ message: 'Invalid Email' })
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
                token: token
            })
        }
    }

}

exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password_digest) {
        return res.status(401).send({ message: 'No Email Or Password' })
    }
    // Check if user exists
    const user = await User_Model.forge({ email: req.body.email }).fetch();
    if (!user) {
        return res.status(400).send({ message: 'Invalid Email' })
    }
    // user.authenticate is the secure password plugin.
    // Authenticate password
    const valid_password = await user.authenticate(req.body.password_digest);
    if (valid_password) {
        const user_email = user.attributes.email;
        const user_id = user.id;
        if (user) {
            const payload = {
                user_id: user_id,
                user_email: user_email,
            };
            const token = jwt.sign({
                payload: payload,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, process.env.SECRET_OR_KEY)
            res.json({
                token: token
            })
        }
    }
}