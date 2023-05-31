var ServicePredict = require('../services/predict.service');


const getAll =  async (req, res) => {
     // Obtenir tous les prédictions
     await ServicePredict.getPredictsService(req, res);
};


  module.exports = {getAll};