const Predict = require('../models/predict.model');
const { performCrudOperation } = require('./crud.service');
const { errorResponse, successResponse }  = require ('./apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Predict, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} predict`);
    return response;
  }
}

async function createPredictService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData );
  res.status(response.statusCode).json(response);
}

async function getPredictsService(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getPredictService(req, res) {
  const { Id } = req.params;
  const response = await performCrudOperationWithResponse('getOne', { Id });
  res.status(response.statusCode).json(response);
}

async function updatePredictService(req, res) {
  const { Id } = req.params;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { Id, formData });
  res.status(response.statusCode).json(response);
}

async function deletePredictService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Predict, 'delete', { Id });
  const response = successResponse(null, 'Predict deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createPredictService,
  getPredictService,
  getPredictsService,
  updatePredictService,
  deletePredictService,
};
