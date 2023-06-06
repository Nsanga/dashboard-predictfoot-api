const Headband = require('../../models/landingPage/headband.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse } = require('../apiResponse.service');
const { uploadFile } = require('../upload.service')

async function performCrudOperationWithResponse(operation, params) {
  try {
    const result = await performCrudOperation(Headband, operation, params);
    const response = successResponse(result);
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to ${operation} headband`);
    return response;
  }
}

async function create(req, res) {
  try {
    const formData = req.body;
    const file = req.file;

    // Upload the file to Amazon S3
    const imageUrl = await uploadFile(file, 'headband'); 
    console.log('Uploaded image URL:', imageUrl);

    // Update the formData with the S3 image URL
    formData.image = imageUrl;

    // Create the Headband document
    const headband = new Headband(formData);
    const result = await headband.save();

    const response = successResponse(result);
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Failed to create headband:', error);
    const response = errorResponse('Failed to create headband');
    res.status(response.statusCode).json(response);
  }
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
      imageUrl = await uploadFile(file, 'headband');
      console.log('Uploaded image URL:', imageUrl);
    }

    // Update the formData with the new S3 image URL if available
    if (imageUrl) {
      formData.image = imageUrl;
    }

    // Update the Headband document
    const result = await Headband.findByIdAndUpdate(Id, formData, { new: true });

    const response = successResponse(result);
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Failed to update headband:', error);
    const response = errorResponse('Failed to update headband');
    res.status(response.statusCode).json(response);
  }
}

async function deleted(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Headband, 'delete', { id: Id });
  const response = successResponse(null, 'Headband deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  create,
  getOne,
  update,
  deleted,
};