const queries = require('../db/queries');
const { User } = require('../passport')

exports.seed_user = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.state(401).send('No Fields')
    }
    const user = await new User({
        email: req.body.email,
        password: req.body.password
    })
    await user.save();
    res.send('ok');
    next();
}
