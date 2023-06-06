const Blog = require('../../models/landingPageModels/blog.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Blog, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} blog`);
    return response;
  }
}

async function createBlogService(req, res) {
  const formData = req.body;
  const response = await performCrudOperationWithResponse('create', formData);
  res.status(response.statusCode).json(response);
}

async function getBlogsService(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getBlogService(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function updateBlogService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id:Id, updates:formData });
  res.status(response.statusCode).json(response);
}

async function deleteBlogService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Blog, 'delete', { id:Id });
  const response = successResponse(null, 'Blog deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createBlogService,
  getBlogService,
  getBlogsService,
  updateBlogService,
  deleteBlogService,
};