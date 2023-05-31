var express = require('express');
var router = express.Router();

// Require controller modules.
var predictController = require('../controllers/predict.controller');

const predictRoutes = app => {
  app.use("/predict", router);



//Get a list of all predict
router.get('/getAll', predictController.getAll);


}

module.exports = predictRoutes;
