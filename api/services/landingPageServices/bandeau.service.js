const Bandeau = require('../../models/landingPageModels/bandeau.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Bandeau, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} bandeau`);
    return response;
  }
}

async function createBandeauService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getBandeauService(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function updateBandeauService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deleteBandeauService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Bandeau, 'delete', { id:Id });
  const response = successResponse(null, 'Bandeau deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createBandeauService,
  getBandeauService,
  updateBandeauService,
  deleteBandeauService,
};
