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
