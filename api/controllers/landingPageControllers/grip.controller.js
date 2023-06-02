var ServiceGrip = require('../../services/landingPageServices/grip.service');


const getAll = async (req, res) => {
     // Obtenir toute les prises en mains
     await ServiceGrip.getGripsService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir une prise en main
  await ServiceGrip.getGripService(req, res);

};

const create = async (req, res) => {
     // Créer une prise en main
     await ServiceGrip.createGripService(req, res);
};

const update = async (req, res) => {
     // Modifier une prise en main
     await ServiceGrip.updateGripService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer une prise en main
     await ServiceGrip.deleteGripService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };