var ServiceBandeau = require('../../services/landingPageServices/bandeau.service');


const getAll = async (req, res) => {
     // Obtenir tous les bandeaux
     await ServiceBandeau.getBandeauxService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir un bandeau
  await ServiceBandeau.getBandeauService(req, res);

};

const create = async (req, res) => {
     // Créer un bandeau
     await ServiceBandeau.createBandeauService(req, res);
};

const update = async (req, res) => {
     // Modifier un bandeau
     await ServiceBandeau.updateBandeauService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer un bandeau
     await ServiceBandeau.deleteBandeauService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };