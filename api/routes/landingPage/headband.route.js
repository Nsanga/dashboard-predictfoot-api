var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Require controller modules.
var headbandController = require('../../controllers/landingPage/headband.controller');

const headbandRoutes = app => {
  app.use("/landing-page/headband", router);



//Get a list of all predict
router.get('/getOne', headbandController.getOne);
router.post('/create', upload.single('image'), headbandController.create);
router.put('/update', upload.single('image'), headbandController.update);
router.delete('/delete', headbandController.deleted);


}

module.exports = headbandRoutes;
