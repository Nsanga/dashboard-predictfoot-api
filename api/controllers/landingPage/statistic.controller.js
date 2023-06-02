var ServiceStatistic = require('../../services/landingPage/statistic.service');


const getAll = async (req, res) => {
     // Get all stats
     await ServiceStatistic.getAll(req, res);

};

const getOne = async (req, res) => {
  // Get a statistic
  await ServiceStatistic.getOne(req, res);

};

const create = async (req, res) => {
     // Create a statistic
     await ServiceStatistic.create(req, res);
};

const update = async (req, res) => {
     // Modify a statistic
     await ServiceStatistic.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a statistic
     await ServiceStatistic.deleted(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };