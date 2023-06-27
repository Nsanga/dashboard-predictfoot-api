const Predict = require('../models/predict.model');
const { performCrudOperation } = require('./crud.service');
const { errorResponse, successResponse } = require('./apiResponse.service');
const paginate = require('./paginate.service');

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

async function getPredictsServiceByDate(req, res) {
  const { dateFrom, dateTo, type, page, limit } = req.query;

  let data = {};

  try {
    if (dateFrom && !dateTo) {
      // Filtrer les données pour la journée spécifiée
      data.date = { $regex: new RegExp(`^${dateFrom}`) };
    } else if (dateFrom && dateTo) {
      // Filtrer les données pour la plage de dates spécifiée
      data.date = { $gte: dateFrom, $lte: dateTo };
    }

    if (type) {
      data.type_prediction = type;
    }

    const predictions = await performCrudOperation(Predict, 'get', data);

    if (predictions.length === 0) {
      // Aucun élément trouvé, renvoyer un message
      return res.status(200).json({ message: 'Aucune prédictions correspondante.' });
    }

    const paginatedResults = paginate(predictions, page, limit);

    return res.status(200).json({
      page: paginatedResults.page,
      limit: paginatedResults.limit,
      totalItems: paginatedResults.totalItems,
      totalPages: paginatedResults.totalPages,
      results: paginatedResults.results
    });
  } catch (error) {
    console.error('Failed to get predicts:', error);
    const response = errorResponse('Failed to get predicts');
    return res.status(response.statusCode).json(response);
  }
}

async function getPredictService(req, res) {
  const { Id } = req.params;
  const response = await performCrudOperationWithResponse('getById', { Id });
  res.status(response.statusCode).json(response);
}

async function updatePredictService(req, res) {
  const { Id } = req.query;
  const formData = req.body;
  const response = await performCrudOperationWithResponse('update', { id: Id, updates: formData });
  res.status(response.statusCode).json(response);
}

async function deletePredictService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Predict, 'delete', { id: Id });
  const response = successResponse(null, 'Predict deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createPredictService,
  getPredictService,
  getPredictsServiceByDate,
  updatePredictService,
  deletePredictService,
};
