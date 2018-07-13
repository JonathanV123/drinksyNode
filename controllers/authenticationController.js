const { User_Model } = require('../db/Models/UserModel');
const jwt = require('jsonwebtoken');




exports.is_authorized = async (req, res, next) => {
    console.log(req.user);
    // Retruns a middleware which runs the strategies. If one of the strategies succeeds, this will set req.user.
    res.send('Im protected')
}


exports.getToken = async (req, res, next) => {
    const query_user = await User_Model.forge({ email: req.body.email }).fetch();
    if (!query_user) {
        return res.status(400).send('user not found')
    }
    // Retruns a middleware which runs the strategies. If one of the strategies succeeds, this will set req.user.
    res.send('Im protected')
}

exports.verifyToken = async (req, res, next) => {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET_OR_KEY, (err, decoded) => {
        if (err) {
            res.send('Invalid Token');
        } else {
            res.json({
                token: 'Valid',
                user: {
                    id: decoded.payload.user_id,
                    email: decoded.payload.user_email,
                    name: decoded.payload.name
                }
            });
        }
    });
}
