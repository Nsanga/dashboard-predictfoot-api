var ServiceBlog = require('../../services/landingPageServices/blog.service');


const getAll = async (req, res) => {
     // Obtenir tous les blogs
     await ServiceBlog.getBlogsService(req, res);

};

const getOne = async (req, res) => {
  // Obtenir un blog
  await ServiceBlog.getBlogService(req, res);

};

const create = async (req, res) => {
     // Créer un blog
     await ServiceBlog.createBlogService(req, res);
};

const update = async (req, res) => {
     // Modifier un blog
     await ServiceBlog.updateBlogService(req, res);
};

const deleted = async (req, res) => {
     // Supprimer un blog
     await ServiceBlog.deleteBlogService(req, res);
};

module.exports = { getAll, getOne, create, update, deleted };