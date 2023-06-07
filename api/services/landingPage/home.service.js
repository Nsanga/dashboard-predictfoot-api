const Home = require('../../models/landingPage/home.model')
const { performCrudOperation } = require('../crud.service');
const { errorResponse, successResponse } = require('../apiResponse.service');
const { uploadFile } = require('../upload.service')

async function performCrudOperationWithResponse(operation, params) {
    try {
        const result = await performCrudOperation(Home, operation, params);
        const response = successResponse(result);
        return response;
    } catch (error) {
        console.log(error)
        const response = errorResponse(`Failed to ${operation} home`);
        return response;
    }
}

async function create(req, res) {
    try {
        let formData = req.body;
        const imageFields = ['headbandImage', 'advertisementImage', 'aboutImage', 'gripImage'];
    // Vérifier et uploader les images si elles existent
        for (const field of imageFields) {
        if (req.files[field]) {
            const fileName = await uploadFile(req.files[field][0], 'Landing-page');
            console.log('Nom du fichier sauvegardé:', fileName);
            formData[field] = fileName;
        }
        }
        const response = await performCrudOperationWithResponse('create', formData);
        res.status(200).json(response);
    } catch (error) {
        console.error('Failed to create home:', error);
        const response = errorResponse('Failed to create home');
        res.status(response.statusCode).json(response);
    }
}

async function getAll(req, res) {
    const response = await performCrudOperationWithResponse('getAll');
    console.log(response);
    return res.status(response.statusCode).json(response);
}

async function getOne(req, res) {
    const { Id } = req.query;
    const response = await performCrudOperationWithResponse('getOne', { id: Id });
    console.log(response);
    return res.status(response.statusCode).json(response);
}

async function update(req, res) {
    try {
        const { Id } = req.query;
        const formData = req.body;
        const file = req.file;

        // If a new file is provided, upload it to Amazon S3
        let imageUrl;
        if (file) {
            imageUrl = await uploadFile(file, 'headband');
            console.log('Uploaded image URL:', imageUrl);
        }

        // Update the formData with the new S3 image URL if available
        if (imageUrl) {
            formData.image = imageUrl;
        }

        // Update the Home document
        const result = await Home.findByIdAndUpdate(Id, formData, { new: true });

        const response = successResponse(result);
        res.status(response.statusCode).json(response);
    } catch (error) {
        console.error('Failed to update headband:', error);
        const response = errorResponse('Failed to update headband');
        res.status(response.statusCode).json(response);
    }
}

async function deleted(req, res) {
    const { Id } = req.query;
    await performCrudOperation(Home, 'delete', { id: Id });
    const response = successResponse(null, 'Home deleted successfully');
    res.status(response.statusCode).json(response);
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    deleted,
};
