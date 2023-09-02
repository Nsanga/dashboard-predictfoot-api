const {
     findCountriesByDate,
     findChampionshipsByCountry,
     findMatchesByChampionship
   } = require('../services/fixture.service');
   
   /**
    * Get countries by date.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const getCountriesByDate = async (req, res) => {
     const response = await findCountriesByDate(req);
     res.status(response.statusCode).json(response);
   };
   
   /**
    * Get championships by country.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const getChampionshipsByCountry = async (req, res) => {
     const response = await findChampionshipsByCountry(req);
     res.status(response.statusCode).json(response);
   };
   
   /**
    * Get matches by championship.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const getMatchesByChampionship = async (req, res) => {
     const response = await findMatchesByChampionship(req, res);
     res.status(response.statusCode).json(response);
   };
   
   module.exports = { 
     getCountriesByDate, 
     getChampionshipsByCountry, 
     getMatchesByChampionship 
   };
   