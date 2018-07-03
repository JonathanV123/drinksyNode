const user_data = require('../../../userData');
const restaurant_data = require('../../../restaurantData');

exports.seed = async function (knex, Promise) {
    try {
        // Delete users in users database
        await knex('users').del();
        // Insert user_data into users
        await knex('users').insert(user_data);
        // Delete restaurants in restaurants database
        await knex('restaurants').del();
        // Insert restaurants in restaurants database
        await knex('restaurants').insert(restaurant_data);
    } catch (err) {
        console.log(err);
    }
};
