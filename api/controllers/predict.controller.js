var ServicePredict = require('../services/predict.service');


const getAll = async (req, res) => {
     // Obtenir tous les prédictions
     await ServicePredict.getPredictsService(req, res);

};

const getOne = async (req, res) => {
     // Obtenir tous les prédictions
     await ServicePredict.getPredictsServiceByDate(req, res);

};

const create = async (req, res) => {
     // Créer une prediction
     await ServicePredict.createPredictService(req, res);
};

const update = async (req, res) => {
     // Créer une prediction
     await ServicePredict.updatePredictService(req, res);
};

const deleted = async (req, res) => {
     // Créer une prediction
     await ServicePredict.deletePredictService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };