var express = require('express');
var router = express.Router();

// Require controller modules.
var publiciteController = require('../../controllers/landingPageControllers/publicite.controller');

const publiciteRoutes = app => {
  app.use("/landing-page/publicite", router);



//Get a list of all predict
router.get('/getAll', publiciteController.getAll);
router.get('/getOne', publiciteController.getOne);
router.post('/create', publiciteController.create);
router.put('/update', publiciteController.update);
router.delete('/delete', publiciteController.deleted);


}

module.exports = publiciteRoutes;
