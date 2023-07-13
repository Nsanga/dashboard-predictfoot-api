var ServiceFixture = require('../services/fixture.service');


const findCountriesByDate = async (req, res) => {
     // find country by date
     await ServiceFixture.findCountriesByDate(req, res);

};

const findChampionshipsByCountry = async (req, res) => {
     // find championships by contry
     await ServiceFixture.findChampionshipsByCountry(req, res);
};

const findMatchesByChampionship = async (req, res) => {
     // Créer une prediction
     await ServiceFixture.findMatchesByChampionship(req, res);
};


module.exports = { findCountriesByDate, findChampionshipsByCountry, findMatchesByChampionship };