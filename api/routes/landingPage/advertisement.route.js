var express = require('express');
var router = express.Router();

// Require controller modules.
var advertisementController = require('../../controllers/landingPage/advertisement.controller');

const advertisementRoutes = app => {
  app.use("/landing-page/advertisement", router);



//Get a list of all predict
router.get('/getAll', advertisementController.getAll);
router.get('/getOne', advertisementController.getOne);
router.post('/create', advertisementController.create);
router.put('/update', advertisementController.update);
router.delete('/delete', advertisementController.deleted);


}

module.exports = advertisementRoutes;
