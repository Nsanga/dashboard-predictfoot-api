var ServicePlan = require('../../services/landingPage/plan.service');


const getAll = async (req, res) => {
     // Get all plans
     await ServicePlan.getAll(req, res);

};

const getOne = async (req, res) => {
  // Get a plan
  await ServicePlan.getOne(req, res);

};

const create = async (req, res) => {
     // Create a plan
     await ServicePlan.create(req, res);
};

const update = async (req, res) => {
     // Modify a plan
     await ServicePlan.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a plan
     await ServicePlan.deleted(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };