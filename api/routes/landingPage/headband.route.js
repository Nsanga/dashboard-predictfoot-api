var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Require controller modules.
var headbandController = require('../../controllers/landingPage/headband.controller');

const headbandRoutes = app => {
  app.use("/landing-page/headband", router);



//Get a list of all predict
router.get('/getById', headbandController.getById);
router.get('/getAll', headbandController.getAll);
router.post('/create', uploads.single('image'), headbandController.create);
router.put('/update', uploads.single('image'), headbandController.update);
router.delete('/delete', headbandController.deleted);


}

module.exports = headbandRoutes;
