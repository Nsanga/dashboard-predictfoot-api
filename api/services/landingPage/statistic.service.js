const Statistic = require('../../models/landingPage/statistic.model');
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Statistic, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} statistic`);
    return response;
  }
}

async function create(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getOne(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function update(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deleted(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Statistic, 'delete', { id:Id });
  const response = successResponse(null, 'Statistic deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  create,
  getOne,
  update,
  deleted,
};
