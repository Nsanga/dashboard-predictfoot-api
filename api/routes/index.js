var express = require('express');
const predictRoutes = require('./predict.route');
const fixtureRoutes = require('./fixture.route');
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
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Predictfoot' });
});

const appRoutes = () => {
  const app = router;
  predictRoutes(app);
  fixtureRoutes(app);
  homeRoutes(app);
  aboutRoutes(app);
  headbandRoutes(app);
  blogRoutes(app);
  customerRoutes(app);
  planRoutes(app);
  gripRoutes(app);
  advertisementRoutes(app);
  serviceRoutes(app);
  statisticRoutes(app);
  return app;
}

module.exports = appRoutes;
