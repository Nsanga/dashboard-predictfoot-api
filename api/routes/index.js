var express = require('express');
const predictRoutes = require('./predict.route');
const aboutRoutes = require('./landingPageRoutes/about.route');
const bandeauRoutes = require('./landingPageRoutes/bandeau.route');
const blogRoutes = require('./landingPageRoutes/blog.route');
const clientRoutes = require('./landingPageRoutes/client.route');
const forfaitRoutes = require('./landingPageRoutes/forfait.route');
const gripRoutes = require('./landingPageRoutes/grip.route');
const publiciteRoutes = require('./landingPageRoutes/publicite.route');
const serviceRoutes = require('./landingPageRoutes/service.route');
const statisticRoutes = require('./landingPageRoutes/statistic.route');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Predictfoot' });
});

const appRoutes = () => {
  const app = router;
  predictRoutes(app);
  aboutRoutes(app);
  bandeauRoutes(app);
  blogRoutes(app);
  clientRoutes(app);
  forfaitRoutes(app);
  gripRoutes(app);
  publiciteRoutes(app);
  serviceRoutes(app);
  statisticRoutes(app);
  return app;
}

module.exports = appRoutes;
