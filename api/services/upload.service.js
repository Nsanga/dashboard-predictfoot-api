const fs = require('fs');
const AWS = require('aws-sdk');
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey });
const s3 = new AWS.S3();
console.log('ok::', s3);

const uploadFile = (files, folder) => {
  if (!Array.isArray(files)) {
    files = [files]; // Convertit en tableau si ce n'est pas déjà le cas
  }

  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      fileStream.on('error', function (err) {
        reject(err);
      });

      const params = {
        Bucket: bucketName,
        Key: `${folder}/${file.originalname}`,
        Body: fileStream,
      };

      s3.upload(params, function (err, data) {
        console.log('ok::', data);
        if (err) {
          reject(err);
        } else {
          const imageUrl = data.Location;
          console.log('Uploaded image URL:', imageUrl);
          resolve(imageUrl);
        }
      });
    });
  });

  return Promise.all(uploadPromises);
};

exports.uploadFile = uploadFile;
