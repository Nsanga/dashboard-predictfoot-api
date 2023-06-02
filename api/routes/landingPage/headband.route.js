var express = require('express');
var router = express.Router();

// Require controller modules.
var headbandController = require('../../controllers/landingPage/headband.controller');

const headbandRoutes = app => {
  app.use("/landing-page/headband", router);



//Get a list of all predict
router.get('/getOne', headbandController.getOne);
router.post('/create', headbandController.create);
router.put('/update', headbandController.update);
router.delete('/delete', headbandController.deleted);


}

module.exports = headbandRoutes;
