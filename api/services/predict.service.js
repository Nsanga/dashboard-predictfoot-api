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

async function createPredictService(req) {
  const formData = req.body;
  try{
  return  performCrudOperationWithResponse('create', formData);
} catch (error) {
  console.log(error)
  return  errorResponse(`Failed to create  predict : ${formData}`);
}
}

async function getPredictsService(req) {
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
      return response;
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
    return errorResponse('Failed to get predicts');
  }
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
    return errorResponse(`Failed to update predict : ${fixture_id}`);
  }
}

async function deletePredictService(req) {
  const { id } = req.query;
  try{
  await performCrudOperation(Predict, 'delete', { id: id });
  return successResponse({'id':id}, 'Predict deleted successfully');
} catch (error) {
  console.log(error)
  return  errorResponse(`Failed to delete predict : ${fixture_id}`);
}
}

module.exports = {
  createPredictService,
  getPredictsService,
  updatePredictService,
  deletePredictService,
};
