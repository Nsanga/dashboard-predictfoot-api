var express = require('express');
var router = express.Router();

// Require controller modules.
var statisticController = require('../../controllers/landingPageControllers/statistic.controller');

const statisticRoutes = app => {
  app.use("/landing-page/statistic", router);



//Get a list of all predict
router.get('/getAll', statisticController.getAll);
router.get('/getOne', statisticController.getOne);
router.post('/create', statisticController.create);
router.put('/update', statisticController.update);
router.delete('/delete', statisticController.deleted);


}

module.exports = statisticRoutes;