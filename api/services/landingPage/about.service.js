const About = require('../../models/landingPage/about.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse }  = require ('../apiResponse.service');
const { uploadFile } = require('../upload.service')

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(About, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} about`);
    return response;
  }
}

async function create(req, res) {
  try {
    const formData = req.body;
    const file = req.file;

    // Upload the file to Amazon S3
    const imageUrl = await uploadFile(file, 'about'); 
    console.log('Uploaded image URL:', imageUrl);

    // Update the formData with the S3 image URL
    formData.image = imageUrl;

    // Create the About document
    const about = new About(formData);
    const result = await about.save();

    const response = successResponse(result);
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Failed to create about:', error);
    const response = errorResponse('Failed to create about');
    res.status(response.statusCode).json(response);
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
    const file = req.file;

    // If a new file is provided, upload it to Amazon S3
    let imageUrl;
    if (file) {
      imageUrl = await uploadFile(file, 'about');
      console.log('Uploaded image URL:', imageUrl);
    }

    // Update the formData with the new S3 image URL if available
    if (imageUrl) {
      formData.image = imageUrl;
    }

    // Update the About document
    const result = await About.findByIdAndUpdate(Id, formData, { new: true });

    const response = successResponse(result);
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Failed to update about:', error);
    const response = errorResponse('Failed to update about');
    res.status(response.statusCode).json(response);
  }
}

async function deleted(req, res) {
  const { Id } = req.query;
  await performCrudOperation(About, 'delete', { id:Id });
  const response = successResponse(null, 'About deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  create,
  getById,
  update,
  deleted,
};
