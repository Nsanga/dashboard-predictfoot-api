var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Require controller modules.
var homeController = require('../../controllers/landingPage/home.controller');

const homeRoutes = app => {
  app.use("/landing-page/home", router);
  
  router.get('/getAll', homeController.getAll);
};

module.exports = homeRoutes;