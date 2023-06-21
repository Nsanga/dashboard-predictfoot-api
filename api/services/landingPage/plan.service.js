const Plan = require('../../models/landingPage/plan.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Plan, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} plan`);
    return response;
  }
}

async function create(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getAll(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getById(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getById', { id: Id });
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
  await performCrudOperation(Plan, 'delete', { id:Id });
  const response = successResponse(null, 'Plan deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleted,
};
