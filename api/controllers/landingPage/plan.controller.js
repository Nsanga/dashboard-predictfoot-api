var ServiceFlatrate = require('../../services/landingPage/plan.service');


const getAll = async (req, res) => {
     // Get all plans
     await ServiceFlatrate.getAll(req, res);

};

const getOne = async (req, res) => {
  // Get a plan
  await ServiceFlatrate.getOne(req, res);

};

const create = async (req, res) => {
     // Create a plan
     await ServiceFlatrate.create(req, res);
};

const update = async (req, res) => {
     // Modify a plan
     await ServiceFlatrate.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a plan
     await ServiceFlatrate.deleted(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };