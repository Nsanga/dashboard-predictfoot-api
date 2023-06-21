var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Require controller modules.
var customerController = require('../../controllers/landingPage/customer.controller');

const customerRoutes = app => {
  app.use("/landing-page/customer", router);



//Get a list of all predict
router.get('/getAll', customerController.getAll);
router.get('/getById', customerController.getById);
router.post('/create', uploads.single('image'), customerController.create);
router.put('/update', uploads.single('image'), customerController.update);
router.delete('/delete', customerController.deleted);


}

module.exports = customerRoutes;
