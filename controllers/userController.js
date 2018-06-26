const queries = require('../db/queries');
const { User } = require('../db/Models/UserModel');

exports.create_user = async (req, res, next) => {
    if (!req.body.email || !req.body.password_digest) {
        return res.status(401).send('No Fields')
    }
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password_digest
    })
    await user.save();
    res.json({
        created_user: true
    })
}
