var express = require('express');
var router = express.Router();

// Require controller modules.
var aboutController = require('../../controllers/landingPage/about.controller');

const aboutRoutes = app => {
  app.use("/landing-page/about", router);



//Get a list of all predict
router.get('/getAll', aboutController.getAll);
router.get('/getOne', aboutController.getOne);
router.post('/create', aboutController.create);
router.put('/update', aboutController.update);
router.delete('/delete', aboutController.deleted);


}

module.exports = aboutRoutes;
