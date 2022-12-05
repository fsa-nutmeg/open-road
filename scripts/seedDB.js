//const app = require('../../src/firebase-config');
const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
const secrets = require('./secrets');

const firebaseConfig = {
  apiKey: secrets.REACT_APP_FIREBASE_API_KEY,
  authDomain: secrets.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: secrets.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: secrets.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: secrets.REACT_APP_FIREBASE_APP_ID,
  databaseURL: secrets.REACT_APP_FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;
