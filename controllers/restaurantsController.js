const queries = require('../db/queries');

// Get all restaurants matching owner ID
exports.get_restaurants_by_id = async (req, res, next) => {
    const restaurants = await queries.getAllByOwner(req.params.id);
    if (restaurants) {
        res.json({
            restaurants
        });
    } else {
        res.send('You have no restaurants')
    }
};
// Get a restaurant by individual restaurant ID
exports.get_restaurant_by_id = async (req, res, next) => {
    const restaurant = await queries.getById(req.params.id);
    if (restaurant) {
        res.json({
            restaurant
        });
    } else {
        res.send('No Restaurant Found')
    }
};

exports.add_restaurant = async (req, res, next) => {
    const restaurant = req.body;
    const user_id = req.params.id;
    // Add the restaurant
    const add_restaurant = await queries.create(user_id, res.locals.toMilitary, res.locals.fromMilitary, restaurant);
    // If successfully added send restaurant info back to client.
    if (add_restaurant) {
        res.json(add_restaurant[0]);
    } else {
        res.status(400).send('Unable to create restaurant. Please try again')
    }
};

exports.update_restaurant = async (req, res, next) => {
    const id = req.params.id;
    const update_info = req.body;
    req.body.toMilitary = res.locals.toMilitary;
    req.body.fromMilitary = res.locals.fromMilitary;
    // Edit the restaurant
    const update_restaurant = await queries.update(id, update_info);
    // If successfully edited send restaurant info back to client.
    if (update_restaurant) {
        res.json(update_restaurant[0]);
    } else {
        res.status(400).send('Unable to update you restaurant. Please try again')
    }
};

exports.delete_restaurant = async (req, res, next) => {
    const id = req.params.id;
    const delete_restaurant = await queries.delete(id);
    var integerId = parseInt(id, 10)
    if (delete_restaurant) {
        res.json({
            deleted: true,
            restaurantId: integerId
        })
    } else {
        res.status(404).send("Unable to delete restaurant :(");
    }
};