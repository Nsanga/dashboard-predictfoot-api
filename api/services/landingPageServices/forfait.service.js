const Forfait = require('../../models/landingPageModels/forfait.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Forfait, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} forfait`);
    return response;
  }
}

async function createForfaitService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getForfaitsService(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getForfaitService(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function updateForfaitService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deleteForfaitService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Forfait, 'delete', { id:Id });
  const response = successResponse(null, 'Forfait deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createForfaitService,
  getForfaitService,
  getForfaitsService,
  updateForfaitService,
  deleteForfaitService,
};
