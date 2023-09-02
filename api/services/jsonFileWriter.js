const fs = require('fs');
const path = require('path');

/**
 * Write data to a JSON file.
 * @param {string} filename - The path to the file where the data will be written.
 * @param {object} data - The data to be written to the file (should be in JSON format).
 */
const jsonFileWriter = (filename, data) => {
  // Get the directory path from the filename.
  const directory = path.dirname(filename);

  // Create the missing directories if necessary.
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Write the data to the specified JSON file.
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Data written to ${filename} successfully.`);
  });
};

module.exports = { jsonFileWriter };
