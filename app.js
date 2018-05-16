const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const pg = require('pg');

require('dotenv').config({path: 'variables.env'})
const app = express();

const connectionString = process.env.DATABASE;

app.use(cors());

app.get('/', (req, res) => {
    const testing = 'Hi!';
    res.send({express: 'Hello From Express'});
    console.log(process.env.DATABASE)
});

app.listen(8080, () => {
    console.log("Server Started On Port 8080")
});