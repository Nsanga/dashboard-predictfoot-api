var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Require controller modules.
var blogController = require('../../controllers/landingPage/blog.controller');
const imageFields = ['profile', 'imageArticle'];

const blogRoutes = app => {
  app.use("/landing-page/blog", router);



//Get a list of all predict
router.get('/getAll', blogController.getAll);
router.get('/getOne', blogController.getOne);
router.post('/create', uploads.fields(imageFields.map((field) => ({ name: field }))), blogController.create);
router.put('/update', uploads.fields(imageFields.map((field) => ({ name: field }))), blogController.update);
router.delete('/delete', blogController.deleted);


}

module.exports = blogRoutes;
