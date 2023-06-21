const Blog = require('../../models/landingPage/blog.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse } = require('../apiResponse.service');
const { uploadFile } = require('../upload.service');
const paginate = require('../paginate.service');

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
    let formData = req.body;
    const imageFields = ['profile', 'imageArticle'];

    // Vérifier et uploader les images si elles existent
    for (const field of imageFields) {
      if (req.files[field]) {
        const fileLocation = await uploadFile(req.files[field][0], 'Blog');
        console.log('Nom du fichier sauvegardé:', fileLocation);
        formData[field] = fileLocation;

      }
    }

    console.log('formData', formData);
    const response = await performCrudOperationWithResponse('create', formData);
    res.status(200).json(response);
  } catch (error) {
    console.error('Failed to create home:', error);
    const response = errorResponse('Failed to create home');
    res.status(response.statusCode).json(response);
  }
}

async function getAll(req, res) {
  try {
    const response = await performCrudOperationWithResponse('getAll');
    const articles = response.data;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Limite d'articles par page, par défaut 10

    const paginatedResults = paginate(articles, page, limit);

    return res.status(response.statusCode).json({
      page: paginatedResults.page,
      limit: paginatedResults.limit,
      totalItems: paginatedResults.totalItems,
      totalPages: paginatedResults.totalPages,
      results: paginatedResults.results
    });
  } catch (error) {
    console.error('Failed to get articles:', error);
    const response = errorResponse('Failed to get articles');
    return res.status(response.statusCode).json(response);
  }
}



async function getById(req, res) {
  const { Id } = req.query;
  const response = await performCrudOperationWithResponse('getById', { id: Id });
  console.log(response);
  return res.status(response.statusCode).json(response);
}

async function update(req, res) {
  try {
    const { Id } = req.query;
    const formData = req.body;
    const imageFields = ['profile', 'imageArticle'];

    // Vérifier et uploader les images si elles existent
    for (const field of imageFields) {
      if (req.files && req.files[field]) {
        const fileLocation = await uploadFile(req.files[field][0], 'Blog');
        console.log('Uploaded image URL:', fileLocation);
        formData[field] = fileLocation;
      }
    }

    // Mettre à jour le document Home
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
  await performCrudOperation(Blog, 'delete', { id: Id });
  const response = successResponse(null, 'Blog deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleted,
};
