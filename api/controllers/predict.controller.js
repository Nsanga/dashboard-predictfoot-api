var ServicePredict = require('../services/predict.service');


const getByDate = async (req, res) => {
     // Obtenir tous les prédictions par rapport a une date 
     const  response = await ServicePredict.getByDatePredictService(req);
     res.status(response.statusCode).json(response)

};

const create = async (req, res) => {
     // Créer une prediction
     await ServicePredict.createPredictService(req, res);
};

const update = async (req, res) => {
     // Mise a jour d'une prediction
   const response =  await ServicePredict.updatePredictService(req);
   res.status(response.statusCode).json(response);
};

const deleted = async (req, res) => {
     // Suppression d'une prediction
     await ServicePredict.deletePredictService(req, res);
};

module.exports = { getByDate, create, update, deleted };