const queries = require('../db/queries');

exports.get_all_restaurants = async (req, res) => {
    const all_restaurants = await queries.getAll();
    res.json(all_restaurants);
};

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

exports.get_restaurant_by_id = async (req, res, next) => {
    const restaurant = await queries.getById(req.params.id);
    console.log(restaurant);
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
    console.log(req.body);
    const add_restaurant = await queries.create(user_id, restaurant);
    if (add_restaurant) {
        res.json(add_restaurant[0]);
    } else {
        next();
    }
};

exports.update_restaurant = async (req, res, next) => {
    const update_info = req.body;
    const id = req.params.id;
    const update_restaurant = await queries.update(id, update_info);
    console.log(update_restaurant)
    if (update_restaurant) {
        res.json(update_restaurant[0]);
    } else {
        next();
    }
};

exports.delete_restaurant = async (req, res, next) => {
    const id = req.params.id;
    const delete_restaurant = await queries.delete(id);
    if (delete_restaurant) {
        res.json({
            deleted: true
        })
    } else {
        res.status(404).send("Unable to delete restaurant :(");
    }
};