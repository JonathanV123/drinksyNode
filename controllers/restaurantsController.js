const queries = require('../db/queries');

exports.get_all_restaurants = async (req, res) => {
    const all_restaurants = await queries.getAll();
    res.json(all_restaurants);
};

exports.get_restaurant_by_id = async (req, res, next) => {
    const single_restaurant_by_id = await queries.getOne(req.params.id);
    if (single_restaurant_by_id) {
        res.json(single_restaurant_by_id);
    } else {
        next();
    }
};

exports.add_restaurant = async (req, res, next) => {
    const restaurant = req.body;
    const add_restaurant = await queries.create(restaurant);
    if (add_restaurant) {
        res.json(add_restaurant[0]);
    } else {
        next();
    }
};

exports.update_restaurant = async (req, res, next) => {
    const update_info = req.body;
    const id = req.params.id;
    console.log(update_info);
    const update_restaurant = await queries.update(id, update_info);
    if (update_restaurant) {
        res.json(update_restaurant[0]);
    } else {
        next();
    }
};