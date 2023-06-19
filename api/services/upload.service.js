const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey });
const s3 = new AWS.S3();
const uploadFile = (file, folder) => {
    return new Promise((resolve, reject) => {
      const fileName = path.basename(file.originalname);
      const params = {
        Bucket: bucketName,
        Key: `${folder}/${fileName}`, 
        Body: file.buffer,
      };
  
      s3.upload(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          const imageUrl = data.Location;
          resolve(imageUrl);
        }
      });
    });
  };

exports.uploadFile = uploadFile

