var express = require('express');
var router = express.Router();

// Require controller modules.
var blogController = require('../../controllers/landingPage/blog.controller');

const blogRoutes = app => {
  app.use("/landing-page/blog", router);



//Get a list of all predict
router.get('/getAll', blogController.getAll);
router.get('/getOne', blogController.getOne);
router.post('/create', blogController.create);
router.put('/update', blogController.update);
router.delete('/delete', blogController.deleted);


}

module.exports = blogRoutes;
