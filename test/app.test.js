process.env.NODE_ENV = 'test';
console.log(process.env.NODE_ENV);
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const knex = require('../db/knex');
const fixtures = require('./fixtures');

describe('CRUD Restaurant', () => {
    beforeEach((done) => {
        // Fresh database
        knex.migrate.rollback()
            .then(() => {
                // Implement schema
                knex.migrate.latest()
                    .then(() => {
                        // Populate database
                        return knex.seed.run()
                            .then(() => {
                                done();
                            });
                    });
            });
    });

    it('Lists all restaurants', (done) => {
        request(app)
            .get('/api/v1/restaurants')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                expect(response.body).to.deep.equal(fixtures.restaurants);
                done();
            })
    });

    it('Lists a restaurant record by ID', (done) => {
        request(app)
            .get('/api/v1/restaurants/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.restaurants[0]);
                done();
            })
    });

    it('It creates a restaurant record', (done) => {
        request(app)
            .post('/api/v1/restaurants')
            .send(fixtures.singleRestaurantTestInfo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.singleRestaurantTestInfo.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.singleRestaurantTestInfo);
                done();
            })
    });

    it('It updates a restaurant record', (done) => {
        fixtures.singleRestaurantTestInfo.rating = 100;
        request(app)
            .put('/api/v1/restaurants/1')
            .send(fixtures.singleRestaurantTestInfo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.singleRestaurantTestInfo.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.singleRestaurantTestInfo);
                done();
            })
    });

    it('It deletes a restaurant record', (done) => {
        fixtures.singleRestaurantTestInfo.rating = 100;
        request(app)
            .delete('/api/v1/restaurants/1')
            .send(fixtures.singleRestaurantTestInfo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.singleRestaurantTestInfo.id = response.body.id;
                expect(response.body).to.deep.equal({
                    deleted:true
                });
                done();
            })
    });
})



