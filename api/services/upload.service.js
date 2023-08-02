const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

// Configure AWS SDK with access credentials.
AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey });

// Create an S3 instance.
const s3 = new AWS.S3();

/**
 * Upload a file to Amazon S3.
 * @param {object} file - The file object to be uploaded (e.g., from multer).
 * @param {string} folder - The folder in the S3 bucket where the file will be stored.
 * @returns {Promise<string>} - A promise that resolves with the URL of the uploaded file.
 */
const uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    // Get the base name of the original file name.
    const fileName = path.basename(file.originalname);

    // Set up the parameters for the S3 upload.
    const params = {
      Bucket: bucketName,
      Key: `${folder}/${fileName}`,
      Body: file.buffer,
    };

    // Upload the file to Amazon S3.
    s3.upload(params, function (err, data) {
      if (err) {
        // If an error occurs during the upload, reject the promise with the error.
        reject(err);
      } else {
        // If the upload is successful, resolve the promise with the URL of the uploaded file.
        const imageUrl = data.Location;
        resolve(imageUrl);
      }
    });
  });
};

// Export the 'uploadFile' function to be used in other files.
exports.uploadFile = uploadFile;
