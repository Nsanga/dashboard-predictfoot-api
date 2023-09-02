// fixture.route.js
const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  getCountriesByDate ,
  getChampionshipsByCountry,
  getMatchesByChampionship,
} = require("../controllers/fixture.controller");

// Function to set up the fixture routes and bind them to the app.
const setupFixtureRoutes = (app) => {
  app.use("/fixture", router);

  // Route to get countries based on the date of fixtures.
  router.get("/getCountries", getCountriesByDate );

  // Route to get championships based on the selected country.
  router.get("/getChampionships", getChampionshipsByCountry);

  // Route to get matches based on the selected championship.
  router.get("/getMatches", getMatchesByChampionship);
};

module.exports = {
  setupFixtureRoutes
};
