var express = require('express');
var router = express.Router();

// Require controller modules.
var serviceController = require('../../controllers/landingPage/service.controller');

const serviceRoutes = app => {
  app.use("/landing-page/service", router);



//Get a list of all predict
router.get('/getAll', serviceController.getAll);
router.get('/getById', serviceController.getById);
router.post('/create', serviceController.create);
router.put('/update', serviceController.update);
router.delete('/delete', serviceController.deleted);


}

module.exports = serviceRoutes;
