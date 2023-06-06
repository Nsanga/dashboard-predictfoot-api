var ServiceHeadband = require('../../services/landingPage/headband.service');

const getOne = async (req, res) => {
  // Get a headband
  await ServiceHeadband.getOne(req, res);

};

const create = async (req, res) => {
     // Create a headband
     await ServiceHeadband.create(req, res);
};

const update = async (req, res) => {
     // Modify a headband
     await ServiceHeadband.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a headband
     await ServiceHeadband.deleted(req, res);
};

module.exports = { getOne, create, update, deleted };