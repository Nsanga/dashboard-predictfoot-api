var express = require('express');
var router = express.Router();

// Require controller modules.
var clientController = require('../../controllers/landingPageControllers/client.controller');

const clientRoutes = app => {
  app.use("/landing-page/client", router);



//Get a list of all predict
router.get('/getAll', clientController.getAll);
router.get('/getOne', clientController.getOne);
router.post('/create', clientController.create);
router.put('/update', clientController.update);
router.delete('/delete', clientController.deleted);


}

module.exports = clientRoutes;
