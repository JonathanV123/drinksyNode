const { User } = require('../db/Models/UserModel');
const jwt = require('jsonwebtoken');




exports.is_authorized = async (req, res, next) => {
    console.log(req.user);
    // Retruns a middleware which runs the strategies. If one of the strategies succeeds, this will set req.user.
    res.send('Im protected')
}