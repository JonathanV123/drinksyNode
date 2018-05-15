const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');

require('dotenv').config({path: 'variables.env'})
const app = express();

const connectionString = process.env.DATABASE;

app.get('/', (req, res) => {
    console.log(process.env.DATABASE)
});

app.listen(3000, () => {
    console.log("Server Started On Port 3000")
});