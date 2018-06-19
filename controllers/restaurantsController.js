const queries = require('../db/queries');

exports.get_all_restaurants = async (req, res) => {
    const all_restaurants = await queries.getAll();
        res.json(all_restaurants);
};
