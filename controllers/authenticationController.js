const jwt = require('jsonwebtoken');

// Check to see if a token is valid
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
