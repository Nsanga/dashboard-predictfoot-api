const fs = require('fs');

const jsonFileWriter = (filename, data) => {
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Data written to ${filename} successfully.`);
  });
};

module.exports = {jsonFileWriter};