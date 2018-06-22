const passport = require('passport');
const { User } = require('../passport')
const jwt = require('jsonwebtoken');


exports.get_token = async (req, res, next) =>{
    if(!req.body.email || !req.body.password){
        return res.status(401).send('Fields not sent')
    }
    const user = await User.forge({email:req.body.email}).fetch();
    if(!user){
        return res.status(400).send('user not found')
    }
    const auth_User = await user.authenticate(req.body.password);
    const payload = {id: auth_User.id};
    const token = jwt.sign(payload, process.env.SECRET_OR_KEY)
    res.send(token);
}


exports.is_authorized = async (req, res, next) =>{
    const a  = await passport.authenticate('jwt', {session: false})
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(a);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log('reqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreq')
    console.log(req);
    console.log('reqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreq')
    console.log('resresresresresresresresresresresresresresresresresresresres')
    console.log(res);
    console.log('resresresresresresresresresresresresresresresresresresresres')

    res.send('Unauthorized')
}