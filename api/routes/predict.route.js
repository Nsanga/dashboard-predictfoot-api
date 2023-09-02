// Import the 'express' module to create an instance of the router.
var express = require("express");
var router = express.Router();

// Require controller modules to handle route logic.
// Import the 'get', 'create', 'update', and 'deleted' functions from the 'predict.controller' file.
var { get, create, update, deleted } = require("../controllers/predict.controller");

/**
 * Set up the predict routes and link them to the corresponding controller functions.
 * @param {express.Application} app - The Express application.
 */
const setupPredictRoutes = (app) => {
  // Mount the 'router' to handle routes with the base path '/predict'.
  app.use("/predict", router);

  // Define the HTTP GET method for the '/get' route, and associate it with the 'get' controller function.
  router.get("/get", get);

  // Define the HTTP POST method for the '/create' route, and associate it with the 'create' controller function.
  router.post("/create", create);

  // Define the HTTP PUT method for the '/update' route, and associate it with the 'update' controller function.
  router.put("/update", update);

  // Define the HTTP DELETE method for the '/delete' route, and associate it with the 'deleted' controller function.
  router.delete("/delete", deleted);
};

// Export the 'setupPredictRoutes' function to be used in other files.
module.exports = { setupPredictRoutes };
