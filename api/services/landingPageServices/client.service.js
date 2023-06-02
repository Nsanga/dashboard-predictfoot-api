const Client = require('../../models/landingPageModels/client.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Client, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} client`);
    return response;
  }
}

async function createClientService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getClientsService(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getClientService(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function updateClientService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deleteClientService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Client, 'delete', { id:Id });
  const response = successResponse(null, 'Client deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createClientService,
  getClientService,
  getClientsService,
  updateClientService,
  deleteClientService,
};
