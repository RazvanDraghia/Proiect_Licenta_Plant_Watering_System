require('dotenv').config(); // Load environment variables from .env file
const admin = require('firebase-admin');

// Use the path to the service account key from the .env file
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  throw new Error('Missing SERVICE_ACCOUNT_KEY_PATH in .env file');
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const database = admin.database();

module.exports = { admin, database };
