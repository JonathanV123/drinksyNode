const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');
const { catchErrors } = require('../errorHandler/errorHandling');
const { isValidId, isValidRestaurant } = require('../middleware/validation');
const restaurant_controller = require('../controllers/restaurantsController');
const user_controller = require('../controllers/userController');
const auth_controller = require('../controllers/authenticationController');


router.get('/',
    catchErrors(restaurant_controller.get_all_restaurants)
);

router.get('/home/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(restaurant_controller.get_restaurants_by_id)

);

router.get('/restaurant/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(restaurant_controller.get_restaurant_by_id)
);

router.post('/verifyToken',
    catchErrors(auth_controller.verifyToken)
);

router.post('/addRestaurant/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(restaurant_controller.add_restaurant)
);

router.patch('/updateRestaurant/:id',
    isValidId,
    catchErrors(restaurant_controller.update_restaurant)
);

router.delete('/deleteRestaurant/:id',
    catchErrors(restaurant_controller.delete_restaurant)
);

router.post('/createUser',
    catchErrors(user_controller.create_user),

);

router.post('/login',
    catchErrors(user_controller.login)
);




module.exports = router;