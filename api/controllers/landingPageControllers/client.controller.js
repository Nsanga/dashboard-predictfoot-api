var ServiceClient = require('../../services/landingPageServices/client.service');


const getAll = async (req, res) => {
     // Obtenir tous les clients
     await ServiceClient.getClientsService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir un client
  await ServiceClient.getClientService(req, res);

};

const create = async (req, res) => {
     // Créer un client
     await ServiceClient.createClientService(req, res);
};

const update = async (req, res) => {
     // Modifier un client
     await ServiceClient.updateClientService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer un client
     await ServiceClient.deleteClientService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };