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
    console.log(req.params.id)
    let fromMilitary = null;
    let toMilitary = null;
    console.log(req.body.to);
    // From 
    standardToMilitary(true, false, req.body.to, req.body.toTimeOfDay)
    // To
    standardToMilitary(false, true, req.body.from, req.body.fromTimeOfDay)
    function standardToMilitary(to, from, time, m) {
        // To Logic ************* Refactor this ugly function!
        if (from === false && to === true) {
            time = parseInt(time, 10);
            if (m === 'am') {
                toMilitary = time === 12 ? 0 : time;
            } else {
                toMilitary = time === 12 ? 12 : time + 12;
            }
        }
        // From Logic ************* 
        if (from === true && to === false) {
            time = parseInt(time, 10);
            if (m === 'am') {
                fromMilitary = time === 12 ? 0 : time;
            } else {
                fromMilitary = time === 12 ? 12 : time + 12;
            }
        }

    }
    console.log(toMilitary)
    const add_restaurant = await queries.create(user_id, toMilitary, fromMilitary, restaurant);
    if (add_restaurant) {
        res.json(add_restaurant[0]);
    } else {
        res.status(400).send('Unable to create restaurant. Please try again')
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
        // TODO send err on no update
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