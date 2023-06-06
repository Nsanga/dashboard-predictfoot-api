var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Require controller modules.
var aboutController = require('../../controllers/landingPage/about.controller');

const aboutRoutes = app => {
  app.use("/landing-page/about", router);



//Get a list of all predict
router.get('/getAll', aboutController.getAll);
router.get('/getOne', aboutController.getOne);
router.post('/create', upload.single('image'), aboutController.create);
router.put('/update', upload.single('image'), aboutController.update);
router.delete('/delete', aboutController.deleted);


}

module.exports = aboutRoutes;
