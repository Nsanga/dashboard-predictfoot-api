const mongoose = require('mongoose');
const localDB = process.env.MONGODB_URL_LOCAL;
const liveDB = process.env.MONGODB_URL_LIVE;

const dbConnect = async () => {
  try {
    // Connection to mongodb
mongoose.connect(liveDB);
mongoose.Promise = global.Promise
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('Connected to mongodb');
})
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    throw error;
  }
};

module.exports = dbConnect;
