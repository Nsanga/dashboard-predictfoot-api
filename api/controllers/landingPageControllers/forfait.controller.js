var ServiceForfait = require('../../services/landingPageServices/forfait.service');


const getAll = async (req, res) => {
     // Obtenir tous les forfaits
     await ServiceForfait.getForfaitsService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir un forfait
  await ServiceForfait.getForfaitService(req, res);

};

const create = async (req, res) => {
     // Créer un forfait
     await ServiceForfait.createForfaitService(req, res);
};

const update = async (req, res) => {
     // Modifier un forfait
     await ServiceForfait.updateForfaitService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer un forfait
     await ServiceForfait.deleteForfaitService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };