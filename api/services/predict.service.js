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
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getByDatePredictService(req, res) {
  const { date } = req.query;
  try {
    const response = await performCrudOperationWithResponse('getByDate',{date:date});
    console.log(response);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to get list predict of date : ${date}`);
    return response;
  }
}

async function getOnePredictService(req, res) {
  const { Id } = req.params;
  const response = await performCrudOperationWithResponse('getOne', { Id });
  res.status(response.statusCode).json(response);
}

async function updatePredictService(req, res) {
  const { fixture_id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', {
    filter: { 'fixture.fixture_id': fixture_id },
    updates: formData
  });
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
  getByDatePredictService,
  getOnePredictService,
  updatePredictService,
  deletePredictService,
};
