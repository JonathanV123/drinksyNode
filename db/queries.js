const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('restaurants');
    },
    getAllByOwner(id) {
        return knex('restaurants').where('owner', id)
    },
    getById(id) {
        return knex('restaurants').where('id', id).first();
    },
    create(id, restaurant) {
        return knex('restaurants').insert(
            { owner: id, description: restaurant.description, title: restaurant.title, drinks: restaurant.drinks }, '*');
    },
    update(id, updatedInfo) {
        return knex('restaurants').where('id', id).update(updatedInfo, '*')
    },
    delete(id) {
        console.log(id);
        return knex('restaurants').where('id', id).del();
    },
};