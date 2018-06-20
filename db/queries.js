const knex = require('./knex');

module.exports = {
    getAll() {
        return knex('restaurant');
    },
    getOne(id) {
        return knex('restaurant').where('id', id).first();
    }
};