var express = require('express');
const predictRoutes = require('./predict.route');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Predictfoot' });
});

const appRoutes = () => {
  const app = router;
  predictRoutes(app);
  return app;
}

module.exports = appRoutes;
