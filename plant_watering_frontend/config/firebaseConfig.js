require('dotenv').config(); 
const admin = require('firebase-admin');

const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  throw new Error('Missing SERVICE_ACCOUNT_KEY_PATH in .env file');
}

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
  databaseURL: 'https://plant-watering-system-e97b9-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.firestore();
module.exports = db;

