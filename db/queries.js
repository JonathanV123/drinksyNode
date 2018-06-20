const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('restaurant');
    },
    getOne(id) {
        return knex('restaurant').where('id', id).first();
    },
    create(restaurant) {
        return knex('restaurant').insert(restaurant, '*');
    },
    update(id, updatedInfo) {
        return knex('restaurant').where('id', id).update(updatedInfo, '*')
    },
    delete(id) {
        return knex('restaurant').where('id', id).del();
    },
};