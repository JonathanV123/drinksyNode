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
    create(id, toMilitary, fromMilitary, restaurant) {
        return knex('restaurants').insert(
            {
                owner: id,
                description: restaurant.description,
                title: restaurant.title,
                food: restaurant.food,
                beer: restaurant.beer,
                wine: restaurant.wine,
                cocktails: restaurant.cocktails,
                fromMilitary: fromMilitary,
                toMilitary: toMilitary,
                fromStandard: restaurant.from,
                toStandard: restaurant.to,
                fromTimeOfDay: restaurant.fromTimeOfDay,
                toTimeOfDay: restaurant.toTimeOfDay
            }, '*');
    },
    update(id, updatedInfo) {
        return knex('restaurants').where('id', id).update(updatedInfo, '*')
    },
    delete(id) {
        return knex('restaurants').where('id', id).del();
    },
};