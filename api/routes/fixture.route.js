var express = require('express');
var router = express.Router();

// Require controller modules.
var fixtureController = require('../controllers/fixture.controller');

const predictRoutes = app => {
  app.use("/fixture", router);



//route fixture
router.get('/getCountries', fixtureController.findCountriesByDate);
router.get('/getChampionships', fixtureController.findChampionshipsByCountry);
router.get('/getMatches', fixtureController.findMatchesByChampionship);


}

module.exports = predictRoutes;  
