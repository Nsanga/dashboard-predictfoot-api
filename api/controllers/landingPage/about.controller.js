var ServiceAbout = require('../../services/landingPage/about.service');

const getAll = async (req, res) => {
     // Get an about
     await ServiceAbout.getAll(req, res);
   
   };

const getById = async (req, res) => {
  // Get an about
  await ServiceAbout.getById(req, res);

};

const create = async (req, res) => {
     // Create an about
     await ServiceAbout.create(req, res);
};

const update = async (req, res) => {
     // Modify an about
     await ServiceAbout.update(req, res);
};

const deleted = async (req, res) => {
     // Delete an about
     await ServiceAbout.deleted(req, res);
};

module.exports = { getAll, getById, create, update, deleted };