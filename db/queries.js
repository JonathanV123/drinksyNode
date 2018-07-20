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
            {
                owner: id,
                description: restaurant.description,
                title: restaurant.title,
                food: restaurant.food,
                beer: restaurant.beer,
                wine: restaurant.wine,
                cocktails: restaurant.cocktails,
                from: restaurant.from,
                to: restaurant.to,
                fromTimeOfDay: restaurant.fromTimeOfday,
                toTimeOfDay: restaurant.toTimeOfday
            }, '*');
    },
    update(id, updatedInfo) {
        return knex('restaurants').where('id', id).update(updatedInfo, '*')
    },
    delete(id) {
        console.log(id);
        return knex('restaurants').where('id', id).del();
    },
};