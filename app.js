const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routingIndex');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet');
const errorHandlers = require('./errorHandler/errorHandling');
const passport = require('passport');

const app = express();


// Return a middle which must be called at the start of connect or express based apps. 
// This sets req._passport. This also sets up req.login() and req.logout()
app.use(passport.initialize());

app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: 'http://jonathanvoxland.com',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Takes form information from req and turns it into usable properties on body
app.use(bodyParser.json());

// replace tiny with combined for more info in morgan
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

// app.use('/api/v1/restaurants', routes);

app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);
module.exports = app;
