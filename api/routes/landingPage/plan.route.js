var express = require('express');
var router = express.Router();

// Require controller modules.
var planController = require('../../controllers/landingPage/plan.controller');

const planRoutes = app => {
  app.use("/landing-page/plan", router);



//Get a list of all predict
router.get('/getAll', planController.getAll);
router.get('/getOne', planController.getOne);
router.post('/create', planController.create);
router.put('/update', planController.update);
router.delete('/delete', planController.deleted);


}

module.exports = planRoutes;
