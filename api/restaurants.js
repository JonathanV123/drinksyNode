const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res) => {
    queries.getAll().then(restaurants => {
        res.json(restaurants);
    })
});

module.exports = router;