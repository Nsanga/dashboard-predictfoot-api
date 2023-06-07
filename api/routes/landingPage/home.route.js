var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Require controller modules.
var homeController = require('../../controllers/landingPage/home.controller');

const homeRoutes = app => {
  app.use("/landing-page/home", router);
  const imageFields = ['headbandImage', 'advertisementImage', 'aboutImage', 'gripImage'];
  // Get a list of all home
  router.get('/getAll', homeController.getAll);
  router.get('/getOne', homeController.getOne);
  router.post('/create', upload.fields(imageFields.map((field) => ({ name: field }))), homeController.create);
  router.put('/update', upload.fields([{ name: 'image', maxCount: 1 }]), homeController.update);
  router.delete('/delete', homeController.deleted);
};

module.exports = homeRoutes;