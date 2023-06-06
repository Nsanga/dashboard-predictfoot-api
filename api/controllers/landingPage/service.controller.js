var ServiceService = require('../../services/landingPage/service.service');


const getAll = async (req, res) => {
     // Get all services
     await ServiceService.getAll(req, res);

};

const getOne = async (req, res) => {
  // Get a service
  await ServiceService.getOne(req, res);

};

const create = async (req, res) => {
     // Create a department
     await ServiceService.create(req, res);
};

const update = async (req, res) => {
     // Modify a service
     await ServiceService.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a service
     await ServiceService.deleted(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };