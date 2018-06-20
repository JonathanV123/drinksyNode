process.env.NODE_ENV = 'test';
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
})



