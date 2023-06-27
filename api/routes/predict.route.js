var express = require('express');
var router = express.Router();

// Require controller modules.
var predictController = require('../controllers/predict.controller');

const predictRoutes = app => {
  app.use("/predict", router);



//Get a list of all predict
router.get('/get', predictController.get);
router.post('/create', predictController.create);
router.put('/update', predictController.update);
router.delete('/delete', predictController.deleted);


}

module.exports = predictRoutes;
