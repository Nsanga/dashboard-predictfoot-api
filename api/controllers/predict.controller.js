const {
     getPredictsService,
     createPredictService,
     updatePredictService,
     deletePredictService,
   } = require("../services/predict.service");
   
   /**
    * Get all predictions.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const get = async (req, res) => {
     const response = await getPredictsService(req);
     res.status(response.statusCode).json(response);
   };
   
   /**
    * Create a prediction.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const create = async (req, res) => {
     const response = await createPredictService(req, res);
     res.status(response.statusCode).json(response);
   };
   
   /**
    * Update a prediction.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const update  = async (req, res) => {
     const response = await updatePredictService(req);
     res.status(response.statusCode).json(response);
   };
   
   /**
    * Delete a prediction.
    * @param {express.Request} req - The request object.
    * @param {express.Response} res - The response object.
    */
   const deleted  = async (req, res) => {
     const response = await deletePredictService(req, res);
     res.status(response.statusCode).json(response);
   };
   
   module.exports = { 
     get , 
     create, 
     update, 
     deleted 
   };
   