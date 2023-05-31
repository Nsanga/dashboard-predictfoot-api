const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const { URL_DB_LIVE, URL_DB_LOCAL, NODE_ENV } = process.env;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    let uri = URL_DB_LIVE || ''; // Utilisez la valeur par défaut comme chaîne vide si URL_DB_LIVE n'est pas défini

    if (NODE_ENV === 'production') {
      // Configuration de la connexion à la base de données en production
      if (!URL_DB_LIVE) {
        throw new Error('URL_DB_LIVE must be defined in production environment');
      }
    } else {
      // Configuration de la connexion à la base de données en local (développement)
      uri = URL_DB_LOCAL; // Remplacez "your_database" par le nom de votre base de données locale
    }

    const connection = await mongoose.createConnection(uri, options);
    console.log('Connexion à MongoDB réussie !');

    return connection;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    throw error;
  }
};

module.exports = dbConnect;
