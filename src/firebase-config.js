import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";

import { getDatabase } from "firebase/database";
import { FirebaseAuthProvider } from "react-admin-firebase";
import "firebase/firestore";
import "firebase/database";
import firebaseDataProvider from "ra-data-firebase-client";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
const database = getDatabase(app);
const options = {
  // Use a different root document to set your resource collections, by default it uses the root collections of firestore
  // Your own, previously initialized firebase app instance
  // app: database,
};
const settings = { context: "dev", imagekey: "images", filekey: "files" };

export const dataProvider = firebaseDataProvider(firebaseConfig, settings);
export const authProvider = FirebaseAuthProvider(firebaseConfig, settings);
// export const firebaseRealtime = FirebaseRealTimeSaga(dataProvider);

export default app;
