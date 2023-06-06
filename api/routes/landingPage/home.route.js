var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Require controller modules.
var homeController = require('../../controllers/landingPage/home.controller');

const homeRoutes = app => {
  app.use("/landing-page/home", router);



  // Get a list of all home
  router.get('/getAll', homeController.getAll);
  router.get('/getOne', homeController.getOne);
  router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }]), homeController.create);
  router.put('/update', upload.fields([{ name: 'image', maxCount: 1 }]), homeController.update);
  router.delete('/delete', homeController.deleted);
};

module.exports = homeRoutes;