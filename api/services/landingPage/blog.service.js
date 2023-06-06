const Blog = require('../../models/landingPage/blog.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');
const { uploadFiles } = require('../upload.service')

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

async function create(req, res) {
  try {
    const formData = req.body;
    const files = req.files;
    const folder = 'blog';

    // Upload the images one by one using uploadFiles
    const uploadedImages = await uploadFiles(files, folder);

    // Update the formData with the uploaded image URLs
    formData.images = uploadedImages;

    // Create the Blog document
    const blog = new Blog(formData);
    const result = await blog.save();

    const response = successResponse(result);
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Failed to create blog:', error);
    const response = errorResponse('Failed to create blog');
    res.status(response.statusCode).json(response);
  }
}

async function getAll(req, res) {
  const response = await performCrudOperationWithResponse('getAll');
  console.log(response);
 return res.status(response.statusCode).json(response);
}

async function getOne(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getOne', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function update(req, res) {
  try {
    const { Id } = req.query;
    const formData = req.body;
    const file = req.file;

    // If a new file is provided, upload it to Amazon S3
    let imageUrl;
    if (file) {
      imageUrl = await uploadFile(file, 'blog');
      console.log('Uploaded image URL:', imageUrl);
    }

    // Update the formData with the new S3 image URL if available
    if (imageUrl) {
      formData.image = imageUrl;
    }

    // Update the Blog document
    const result = await Blog.findByIdAndUpdate(Id, formData, { new: true });

    const response = successResponse(result);
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Failed to update blog:', error);
    const response = errorResponse('Failed to update blog');
    res.status(response.statusCode).json(response);
  }
}

async function deleted(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Blog, 'delete', { id:Id });
  const response = successResponse(null, 'Blog deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  create,
  getOne,
  getAll,
  update,
  deleted,
};
