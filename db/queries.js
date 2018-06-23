const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('restaurant');
    },
    getOne(id) {
        return knex('restaurant').where('id', id).first();
    },
    create(id, restaurant) {
        return knex('restaurants').insert(
            { owner: id, description: restaurant.description, title: restaurant.title, drinks: restaurant.drinks }, '*');
    },
    update(id, updatedInfo) {
        return knex('restaurant').where('id', id).update(updatedInfo, '*')
    },
    delete(id) {
        return knex('users').where('id', id).del();
    },
};