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
    console.log(req.params.id)
    const delete_restaurant = await queries.delete(id);
    console.log(delete_restaurant);
    if (delete_restaurant) {
        res.json({
            deleted: true
        })
    } else {
        res.status(404).send("Unable to delete restaurant :(");
    }
};