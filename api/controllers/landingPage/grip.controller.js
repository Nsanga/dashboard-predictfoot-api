var ServiceGrip = require('../../services/landingPage/grip.service');


const getAll = async (req, res) => {
     // Get all the grips
     await ServiceGrip.getAll(req, res);

};

const getById = async (req, res) => {
     // Get a grip
     await ServiceGrip.getById(req, res);

};

const create = async (req, res) => {
     // Create a grip
     await ServiceGrip.create(req, res);
};

const update = async (req, res) => {
     // Edit a grip
     await ServiceGrip.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a grip
     await ServiceGrip.deleted(req, res);
};

module.exports = { getAll, getById, create, update, deleted };