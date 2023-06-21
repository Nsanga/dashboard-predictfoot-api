var express = require('express');
var router = express.Router();

// Require controller modules.
var statisticController = require('../../controllers/landingPage/statistic.controller');

const statisticRoutes = app => {
  app.use("/landing-page/statistic", router);



//Get a list of all predict
router.get('/getById', statisticController.getById);
router.post('/create', statisticController.create);
router.put('/update', statisticController.update);
router.delete('/delete', statisticController.deleted);


}

module.exports = statisticRoutes;
