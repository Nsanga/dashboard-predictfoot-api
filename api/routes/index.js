// Import the 'express' module to create an instance of the router.
const express = require('express');
const router = express.Router();

// Import route modules with updated filenames.
const { setupPredictRoutes } = require('./predict.route');
const { setupFixtureRoutes } = require('./fixture.route');
const aboutRoutes = require('./landingPage/about.route');
const headbandRoutes = require('./landingPage/headband.route');
const blogRoutes = require('./landingPage/blog.route');
const customerRoutes = require('./landingPage/customer.route');
const planRoutes = require('./landingPage/plan.route');
const gripRoutes = require('./landingPage/grip.route');
const advertisementRoutes = require('./landingPage/advertisement.route');
const serviceRoutes = require('./landingPage/service.route');
const statisticRoutes = require('./landingPage/statistic.route');
const homeRoutes = require('./landingPage/home.route');

/* GET home page. */
// Define a route for the home page ('/') that renders the 'index' template with the title 'Predictfoot'.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Predictfoot' });
});

/**
 * Function to set up all the app routes and connect them to their corresponding route modules.
 * @returns {express.Router} - The configured router instance.
 */
const setupAppRoutes = () => {
  const app = router;

  // Set up the predict routes and link them to the corresponding route module.
  setupPredictRoutes(app);

  // Set up the fixture routes and link them to the corresponding route module.
  setupFixtureRoutes(app);

  // Set up the home page routes and link them to the corresponding route module.
  homeRoutes(app);

  // Set up the about page routes and link them to the corresponding route module.
  aboutRoutes(app);

  // Set up the headband page routes and link them to the corresponding route module.
  headbandRoutes(app);

  // Set up the blog page routes and link them to the corresponding route module.
  blogRoutes(app);

  // Set up the customer page routes and link them to the corresponding route module.
  customerRoutes(app);

  // Set up the plan page routes and link them to the corresponding route module.
  planRoutes(app);

  // Set up the grip page routes and link them to the corresponding route module.
  gripRoutes(app);

  // Set up the advertisement page routes and link them to the corresponding route module.
  advertisementRoutes(app);

  // Set up the service page routes and link them to the corresponding route module.
  serviceRoutes(app);

  // Set up the statistic page routes and link them to the corresponding route module.
  statisticRoutes(app);

  return app;
}

// Export the 'setupAppRoutes' function to be used in other files.
module.exports = setupAppRoutes;
