var ServicePublicite = require('../../services/landingPageServices/publicite.service');


const getAll = async (req, res) => {
     // Obtenir toutes les publicites
     await ServicePublicite.getPublicitesService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir une publicite
  await ServicePublicite.getPubliciteService(req, res);

};

const create = async (req, res) => {
     // Créer une publicite
     await ServicePublicite.createPubliciteService(req, res);
};

const update = async (req, res) => {
     // Modifier une publicite
     await ServicePublicite.updatePubliciteService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer une publicite
     await ServicePublicite.deletePubliciteService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };