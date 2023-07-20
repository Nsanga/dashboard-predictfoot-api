var ServiceStatistic = require('../../services/landingPage/statistic.service');

const getById = async (req, res) => {
  // Get a statistic
  await ServiceStatistic.getById(req, res);

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

module.exports = { getById, create, update, deleted };