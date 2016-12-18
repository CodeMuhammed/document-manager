
import bodyParser from 'body-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import routes from './routes';

export default {
  extend: (expressApp) => {
    // Log requests to the console.
    expressApp.use(logger('dev'));

    // Categorize CRUD request corectly
    expressApp.use(methodOverride('_method'));

    // Parse incoming request's data.
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({ extended: true }));

    // Add routes here
    routes.apply(expressApp);
  },
};
