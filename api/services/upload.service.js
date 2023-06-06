const fs = require('fs');
const AWS = require('aws-sdk');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey });
const s3 = new AWS.S3();
console.log('ok::', s3)

const uploadFile = (file, folder) => {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(file.path);
        // console.log('ok::', file) 
        fileStream.on('error', function (err) {
            reject(err);
        });

        const params = {
            Bucket: bucketName,
            Key: `${folder}/${file.originalname}`,
            Body: fileStream,
        };

        s3.upload(params, function (err, data) {
            console.log('ok::', data)
            if (err) {
                reject(err);
            } else {
                const imageUrl = data.Location;
                console.log('Uploaded image URL:', imageUrl);
                resolve(imageUrl);
            }
        });
    });
};

exports.uploadFile = uploadFile

const uploadFiles = async (files, folder) => {
    const uploadedFiles = [];

    for (const file of files) {
        try {
            const imageUrl = await uploadFile(file, folder);
            uploadedFiles.push(imageUrl);
        } catch (error) {
            console.error(`Failed to upload file: ${file.originalname}`, error);
        }
    }

    return uploadedFiles;
};

exports.uploadFiles = uploadFiles
