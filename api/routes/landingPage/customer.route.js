var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Require controller modules.
var customerController = require('../../controllers/landingPage/customer.controller');

const customerRoutes = app => {
  app.use("/landing-page/customer", router);



//Get a list of all predict
router.get('/getAll', customerController.getAll);
router.get('/getOne', customerController.getOne);
router.post('/create', upload.single('image'), customerController.create);
router.put('/update', upload.single('image'), customerController.update);
router.delete('/delete', customerController.deleted);


}

module.exports = customerRoutes;
