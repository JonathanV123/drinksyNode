const queries = require('../db/queries');

exports.get_all_restaurants = async (req, res) => {
    const all_restaurants = await queries.getAll();
    res.json(all_restaurants);
};

exports.get_restaurant_by_id = async (req, res, next) => {
    console.log('HOME TEST ROUTE HIT');
    const single_restaurant_by_id = await queries.getOne(req.params.id);
    if (single_restaurant_by_id) {
        console.log(single_restaurant_by_id);
        res.json(single_restaurant_by_id);
    } else {
        next();
    }
};

exports.add_restaurant = async (req, res, next) => {
    const restaurant = req.body;
    const user_id = 7;
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
        next();
    }
};