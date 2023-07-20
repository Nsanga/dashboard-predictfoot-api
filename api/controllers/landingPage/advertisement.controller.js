var ServiceAdvertisement = require('../../services/landingPage/advertisement.service');

const getAll = async (req, res) => {
     // Get all advertisement
     await ServiceAdvertisement.getAll(req, res);
   
   };

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

module.exports = { getAll, getById, create, update, deleted };