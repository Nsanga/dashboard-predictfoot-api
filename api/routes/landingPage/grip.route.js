var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Require controller modules.
var gripController = require('../../controllers/landingPage/grip.controller');

const gripRoutes = app => {
  app.use("/landing-page/grip", router);



//Get a list of all predict
router.get('/getAll', gripController.getAll);
router.get('/getOne', gripController.getOne);
router.post('/create', upload.single('image'), gripController.create);
router.put('/update', upload.single('image'), gripController.update);
router.delete('/delete', gripController.deleted);


}

module.exports = gripRoutes;
