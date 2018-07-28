import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
});

const databaseRef = firebase.database().ref();
export const storageRef = firebase.storage().ref();
export const itemsRef = databaseRef.child("items");
//gsutil cors set cors.json gs: //bit-exercise.appspot.com