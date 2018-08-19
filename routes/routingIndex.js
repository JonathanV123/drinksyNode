const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');
const { catchErrors } = require('../errorHandler/errorHandling');
const { isValidId } = require('../middleware/validation');
const { standardToMilitaryTO, standardToMilitaryFROM } = require('../middleware/standardToMilitary');
const restaurant_controller = require('../controllers/restaurantsController');
const user_controller = require('../controllers/userController');
const auth_controller = require('../controllers/authenticationController');

// Get all restaurants of current user
router.get('/home/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(restaurant_controller.get_restaurants_by_id)

);

// Get restaurant by individual ID
router.get('/restaurant/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(restaurant_controller.get_restaurant_by_id)
);

// Verify user token for authentication
router.post('/verifyToken',
    catchErrors(auth_controller.verifyToken)
);

// Add a restaurant
router.post('/addRestaurant/:id',
    passport.authenticate('jwt', { session: false }),
    standardToMilitaryTO,
    standardToMilitaryFROM,
    catchErrors(restaurant_controller.add_restaurant)
);

// Edit a restaurant
router.patch('/updateRestaurant/:id',
    isValidId,
    passport.authenticate('jwt', { session: false }),
    standardToMilitaryTO,
    standardToMilitaryFROM,
    catchErrors(restaurant_controller.update_restaurant)
);

// Delete a restaurant
router.delete('/deleteRestaurant/:id',
    passport.authenticate('jwt', { session: false }),
    catchErrors(restaurant_controller.delete_restaurant)
);

// Create a new user
router.post('/createUser',
    catchErrors(user_controller.create_user),

);

// Login to app
router.post('/login',
    catchErrors(user_controller.login)
);




module.exports = router;