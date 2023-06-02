var express = require('express');
var router = express.Router();

// Require controller modules.
var bandeauController = require('../../controllers/landingPageControllers/bandeau.controller');

const bandeauRoutes = app => {
  app.use("/landing-page/bandeau", router);



//Get a list of all predict
router.get('/getOne', bandeauController.getOne);
router.post('/create', bandeauController.create);
router.put('/update', bandeauController.update);
router.delete('/delete', bandeauController.deleted);


}

module.exports = bandeauRoutes;
