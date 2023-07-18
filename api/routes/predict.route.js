var express = require('express');
var router = express.Router();

// Require controller modules.
var predictController = require('../controllers/predict.controller');

const predictRoutes = app => {
  app.use("/predict", router);



//route prediction
router.get('/getByDate', predictController.getByDate);
router.post('/create', predictController.create);
router.put('/update', predictController.update);
router.delete('/delete', predictController.deleted);


}

module.exports = predictRoutes;
