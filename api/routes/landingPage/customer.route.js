var express = require('express');
var router = express.Router();

// Require controller modules.
var customerController = require('../../controllers/landingPage/customer.controller');

const customerRoutes = app => {
  app.use("/landing-page/customer", router);



//Get a list of all predict
router.get('/getAll', customerController.getAll);
router.get('/getOne', customerController.getOne);
router.post('/create', customerController.create);
router.put('/update', customerController.update);
router.delete('/delete', customerController.deleted);


}

module.exports = customerRoutes;
