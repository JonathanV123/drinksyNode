const restaurants = require('../../restaurantData');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurant').insert(restaurants);
    });
};
