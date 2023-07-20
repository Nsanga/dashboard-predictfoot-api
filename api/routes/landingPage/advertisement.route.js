var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Require controller modules.
var advertisementController = require('../../controllers/landingPage/advertisement.controller');

const advertisementRoutes = app => {
  app.use("/landing-page/advertisement", router);



//Get a list of all predict
router.get('/getById', advertisementController.getById);
router.post('/create', uploads.single('image'), advertisementController.create);
router.put('/update', uploads.single('image'), advertisementController.update);
router.delete('/delete', advertisementController.deleted);


}

module.exports = advertisementRoutes;
