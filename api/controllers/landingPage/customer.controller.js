var ServiceCustomer = require('../../services/landingPage/customer.service');


const getAll = async (req, res) => {
     // Get all customers
     await ServiceCustomer.getAll(req, res);

};

const getOne = async (req, res) => {
  // Get a customer
  await ServiceCustomer.getOne(req, res);

};

const create = async (req, res) => {
     // Create a customer
     await ServiceCustomer.create(req, res);
};

const update = async (req, res) => {
     // Edit a customer
     await ServiceCustomer.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a customer
     await ServiceCustomer.deleted(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };