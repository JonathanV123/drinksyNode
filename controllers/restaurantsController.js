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
    let fromMilitary = null;
    let toMilitary = null;
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
    // Add the restaurant
    const add_restaurant = await queries.create(user_id, toMilitary, fromMilitary, restaurant);
    // If successfully added send restaurant info back to client.
    if (add_restaurant) {
        res.json(add_restaurant[0]);
    } else {
        res.status(400).send('Unable to create restaurant. Please try again')
    }
};

exports.update_restaurant = async (req, res, next) => {
    const id = req.params.id;
    let fromMilitary = null;
    let toMilitary = null;
    // From 
    standardToMilitary(true, false, req.body.toStandard, req.body.toTimeOfDay)
    // To
    standardToMilitary(false, true, req.body.fromStandard, req.body.fromTimeOfDay)
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
    req.body.toMilitary = toMilitary;
    req.body.fromMilitary = fromMilitary;
    const update_info = req.body;
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
    if (delete_restaurant) {
        res.json({
            deleted: true
        })
    } else {
        res.status(404).send("Unable to delete restaurant :(");
    }
};