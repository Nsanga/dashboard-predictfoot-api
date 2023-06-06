const Service = require('../../models/landingPageModels/service.model');
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Service, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} service`);
    return response;
  }
}

async function createServiceService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getServicesService(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getServiceService(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function updateServiceService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deleteServiceService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Service, 'delete', { id:Id });
  const response = successResponse(null, 'Service deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createServiceService,
  getServiceService,
  getServicesService,
  updateServiceService,
  deleteServiceService,
};