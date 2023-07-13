const fs = require('fs');
const path = require('path');

const jsonFileWriter = (filename, data) => {
  const directory = path.dirname(filename);

  // Créer les répertoires manquants si nécessaire
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Data written to ${filename} successfully.`);
  });
};

module.exports = { jsonFileWriter };
