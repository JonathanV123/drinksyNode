const express = require('express');
const router = express.Router();
const { catchErrors } = require('../errorHandler/errorHandling');
const { isValidId, isValidRestaurant } = require('../middleware/validation');
const restaurant_controller = require('../controllers/restaurantsController');
const user_controller = require('../controllers/userController');
const auth_controller = require('../controllers/authenticationController');

router.get('/',
    catchErrors(restaurant_controller.get_all_restaurants)
)


router.get('/:id',
    isValidId,
    catchErrors(restaurant_controller.get_restaurant_by_id)
);

router.post('/',
    isValidRestaurant,
    catchErrors(restaurant_controller.add_restaurant)
);

router.put('/:id',
    isValidId,
    catchErrors(restaurant_controller.update_restaurant)
);

router.delete('/:id',
    isValidId,
    catchErrors(restaurant_controller.delete_restaurant)
);

router.post('/seedUser',
    catchErrors(user_controller.seed_user)
)

router.post('/getToken',
    catchErrors(auth_controller.get_token)
)

module.exports = router;