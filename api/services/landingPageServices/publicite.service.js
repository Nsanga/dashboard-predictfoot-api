const Publicite = require('../../models/landingPageModels/publicite.model');
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Publicite, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} publicite`);
    return response;
  }
}

async function createPubliciteService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getPublicitesService(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getPubliciteService(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function updatePubliciteService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deletePubliciteService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Publicite, 'delete', { id:Id });
  const response = successResponse(null, 'Publicite deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createPubliciteService,
  getPubliciteService,
  getPublicitesService,
  updatePubliciteService,
  deletePubliciteService,
};
