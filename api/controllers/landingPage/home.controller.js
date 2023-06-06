var ServiceHome = require('../../services/landingPage/home.service');

const getAll = async (req, res) => {
    // Get all the home
    await ServiceHome.getAll(req, res);

};

const getOne = async (req, res) => {
  // Get a home
  await ServiceHome.getOne(req, res);

};

const create = async (req, res) => {
     // Create a home
     await ServiceHome.create(req, res);
};

const update = async (req, res) => {
     // Modify a home
     await ServiceHome.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a home
     await ServiceHome.deleted(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };