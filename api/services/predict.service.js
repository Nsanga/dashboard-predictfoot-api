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
  console.log(response)
  res.status(response.statusCode).json(response);
}

async function getPredictsService(req, res) {
  const { dateFrom, dateTo, type, search  } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  let data = {};

  try {
    if (!dateFrom) {
      const response = errorResponse('Missing dateFrom parameter');
      return response;
    }

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

    if (search) {
      // Rechercher dans homeTeam ou awayTeam
      data.$or = [
        { 'fixture.homeTeam.team_name': { $regex: new RegExp(search, 'i') } },
        { 'fixture.awayTeam.team_name': { $regex: new RegExp(search, 'i') } } 
      ];
    }

    const predictions = await performCrudOperation(Predict, 'get', data);

    if (predictions.length === 0) {
      // Aucun élément trouvé, renvoyer un message
      const response = successResponse('Aucune prédiction correspondante.');
      console.log(response)
      return res.status(response.statusCode).json(response);
    }

    const paginatedResults = paginate(predictions, page, limit);

    const response = successResponse({
      page: paginatedResults.page,
      limit: paginatedResults.limit,
      totaItemsPerPage: paginatedResults.limit,
      totalItems: paginatedResults.totalItems,
      totalPages: paginatedResults.totalPages,
      results: paginatedResults.results 
    }); 

    return response;

  } catch (error) {
    console.error('Failed to get predicts:', error);
    const response = errorResponse('Failed to get predicts');
    return res.status(response.statusCode).json(response);
  }
}

async function getOnePredictService(req, res) {
  const { Id } = req.params;
  const response = await performCrudOperationWithResponse('getById', { Id });
  res.status(response.statusCode).json(response);
}

async function updatePredictService(req) {
  try {
    const { fixture_id } = req.query;
    const formData = req.body;
    const response = await performCrudOperationWithResponse('update', {
      filter: { 'fixture.fixture_id': fixture_id },
      updates: formData
    });
    return response;
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to update predict : ${fixture_id}`);
    return response;
  }
}

async function deletePredictService(req, res) {
  const { Id } = req.query;
  await performCrudOperation(Predict, 'delete', { id: Id });
  const response = successResponse(null, 'Predict deleted successfully');
  res.status(response.statusCode).json(response);
}

module.exports = {
  createPredictService,
  getPredictsService,
  updatePredictService,
  deletePredictService,
};
