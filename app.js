const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routingIndex');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const pg = require('pg');
const morgan = require('morgan')
const helmet = require('helmet');
const errorHandlers = require('./errorHandler/errorHandling');

const app = express();
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

// Takes form information from req and turns it into usable properties on body
app.use(bodyParser.json());
// replace tiny with combined for more info in morgan
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/restaurants', routes);

app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);
module.exports = app;
