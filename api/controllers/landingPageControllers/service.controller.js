var ServiceService = require('../../services/landingPageServices/service.service');


const getAll = async (req, res) => {
     // Obtenir tous les services
     await ServiceService.getServicesService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir un service
  await ServiceService.getServiceService(req, res);

};

const create = async (req, res) => {
     // Créer un service
     await ServiceService.createServiceService(req, res);
};

const update = async (req, res) => {
     // Modifier un service
     await ServiceService.updateServiceService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer un service
     await ServiceService.deleteServiceService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };