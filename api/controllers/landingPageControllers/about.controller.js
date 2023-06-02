var ServiceAbout = require('../../services/landingPageServices/about.service');


const getAll = async (req, res) => {
     // Obtenir tous les abouts
     await ServiceAbout.getAboutsService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir un about
  await ServiceAbout.getAboutService(req, res);

};

const create = async (req, res) => {
     // Créer un about
     await ServiceAbout.createAboutService(req, res);
};

const update = async (req, res) => {
     // Modifier un about
     await ServiceAbout.updateAboutService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer un about
     await ServiceAbout.deleteAboutService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };