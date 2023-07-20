var ServiceBlog = require('../../services/landingPage/blog.service');


const getAll = async (req, res) => {
     // Get all blogs
     await ServiceBlog.getAll(req, res);

};

const getById = async (req, res) => {
  // Get a blog
  await ServiceBlog.getById(req, res);

};

const create = async (req, res) => {
     // Create a blog
     await ServiceBlog.create(req, res);
};

const update = async (req, res) => {
     // Edit a blog
     await ServiceBlog.update(req, res);
};

const deleted = async (req, res) => {
     // Delete a blog
     await ServiceBlog.deleted(req, res);
};

module.exports = { getAll, getById, create, update, deleted };