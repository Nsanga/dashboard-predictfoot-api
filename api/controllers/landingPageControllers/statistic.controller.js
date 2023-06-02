var ServiceStatistic = require('../../services/landingPageServices/statistic.service');


const getAll = async (req, res) => {
     // Obtenir toutes les statistics
     await ServiceStatistic.getStatisticsService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir une statistic
  await ServiceStatistic.getStatisticService(req, res);

};

const create = async (req, res) => {
     // Créer une statistic
     await ServiceStatistic.createStatisticService(req, res);
};

const update = async (req, res) => {
     // Modifier une statistic
     await ServiceStatistic.updateStatisticService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer une statistic
     await ServiceStatistic.deleteStatisticService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };