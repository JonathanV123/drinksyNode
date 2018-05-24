const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
// const {catchErrors} = require('../errorHandler/errorHandling');


router.get('/', placeController.landingPage);




module.exports = router;