process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const knex = require('../db/knex');
const fixtures = require('./fixtures');
const single_restaurant_info = fixtures.singleRestaurantTestInfo;
const singleRestaurantTestInfoUpdate = fixtures.singleRestaurantTestInfoUpdate;
console.log(singleRestaurantTestInfoUpdate)

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
            .get('/')
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
            .get('/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.restaurants[0]);
                done();
            })
    });

    it('It deletes a restaurant record', (done) => {
        request(app)
            .delete('/deleteRestaurant/6')
            // .send(single_restaurant_info)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                single_restaurant_info.owner = response.body.id;
                expect(response.body).to.deep.equal({
                    deleted: true
                });
                done();
            })
    });

    it('It updates a restaurant record', (done) => {
        request(app)
            .put('/updateRestaurant/5')
            .send(singleRestaurantTestInfoUpdate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(singleRestaurantTestInfoUpdate);
                done();
            })
    });



    // it('It creates a restaurant record', (done) => {
    //     request(app)
    //         .post('/addRestaurant')
    //         .send(fixtures.singleRestaurantTestInfo)
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .then((response) => {
    //             expect(response.body).to.be.a('object');
    //             fixtures.singleRestaurantTestInfo.id = response.body.id;
    //             expect(response.body).to.deep.equal(fixtures.singleRestaurantTestInfo);
    //             done();
    //         })
    // });
})



