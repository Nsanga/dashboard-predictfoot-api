var ServiceHome = require('../../services/landingPage/home.service');

const getAll = async (req, res) => {
    // Get all the home
    await ServiceHome.getAll(req, res);

};

module.exports = { getAll };