const express = require('express');
const router = express.Router();
const { catchErrors } = require('../errorHandler/errorHandling');
const { isValidId } = require('../middleware/validation');
const restaurant_controller = require('../controllers/restaurantsController');



router.get('/', catchErrors(restaurant_controller.get_all_restaurants)
)


router.get('/:id',
    isValidId,
    catchErrors(restaurant_controller.get_restaurant_by_id)
);

module.exports = router;