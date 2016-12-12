
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


// @TODO sync with github
// configure circleCI with complete db setup.
// add coveralls and add badges to readme.

// Add task runer gulp
// write tests.

// copy the task creation format
// Define major chunks of tasks and describe them according to standards
// Init git 
// Branch out to develop.
// branch out to setup
// commit the changes so far
// Send in a pr to develop describing what has been done
// merge to develop 