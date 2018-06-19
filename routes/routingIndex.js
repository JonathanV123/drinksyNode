const express = require('express');
const router = express.Router();
const restaurant_controller = require('../controllers/restaurantsController');

router.get('/', restaurant_controller.get_all_restaurants)

module.exports = router;