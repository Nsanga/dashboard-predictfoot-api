var ServiceAdvertisement = require('../../services/landingPage/advertisement.service');

const getById = async (req, res) => {
  // Get an advertisement
  await ServiceAdvertisement.getById(req, res);

};

const create = async (req, res) => {
     // Create an advertisement
     await ServiceAdvertisement.create(req, res);
};

const update = async (req, res) => {
     // Edit an advertisement
     await ServiceAdvertisement.update(req, res);
};

const deleted = async (req, res) => {
     // Delete an advertisement
     await ServiceAdvertisement.deleted(req, res);
};

module.exports = { getById, create, update, deleted };