var express = require('express');
var router = express.Router();

// Require controller modules.
var gripController = require('../../controllers/landingPageControllers/grip.controller');

const gripRoutes = app => {
  app.use("/landing-page/grip", router);



//Get a list of all predict
router.get('/getAll', gripController.getAll);
router.get('/getOne', gripController.getOne);
router.post('/create', gripController.create);
router.put('/update', gripController.update);
router.delete('/delete', gripController.deleted);


}

module.exports = gripRoutes;
