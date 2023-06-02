var express = require('express');
var router = express.Router();

// Require controller modules.
var forfaitController = require('../../controllers/landingPageControllers/forfait.controller');

const forfaitRoutes = app => {
  app.use("/landing-page/forfait", router);



//Get a list of all predict
router.get('/getAll', forfaitController.getAll);
router.get('/getOne', forfaitController.getOne);
router.post('/create', forfaitController.create);
router.put('/update', forfaitController.update);
router.delete('/delete', forfaitController.deleted);


}

module.exports = forfaitRoutes;
