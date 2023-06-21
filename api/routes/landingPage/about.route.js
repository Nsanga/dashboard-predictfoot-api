var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Require controller modules.
var aboutController = require('../../controllers/landingPage/about.controller');

const aboutRoutes = app => {
  app.use("/landing-page/about", router);



//Get a list of all predict
router.get('/getById', aboutController.getById);
router.post('/create', uploads.single('image'), aboutController.create);
router.put('/update', uploads.single('image'), aboutController.update);
router.delete('/delete', aboutController.deleted);


}

module.exports = aboutRoutes;
