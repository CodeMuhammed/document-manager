
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming request's data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import models here

// Configure jwt authentication here.

// Configure routes here
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;


// Collect coverage data after test.
// configure circleCI with complete db setup.


// add coveralls and add badges to readme.

// Add task runer gulp
// write tests.