// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1i9zeFof5ejchWE0VlEmuXlAvgXk__gM",
  authDomain: "wavestyled-8fcb5.firebaseapp.com",
  projectId: "wavestyled-8fcb5",
  storageBucket: "wavestyled-8fcb5.appspot.com",
  messagingSenderId: "428294232445",
  appId: "1:428294232445:web:2d074e5d7be159a7ba5414",
  measurementId: "G-8CGTGW2PCQ"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { auth };