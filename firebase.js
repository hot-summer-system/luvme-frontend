// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNeGwWozkqIrErgecxm7RtlmSetI5AjW8",
    authDomain: "luvme-400410.firebaseapp.com",
    projectId: "luvme-400410",
    storageBucket: "luvme-400410.appspot.com",
    messagingSenderId: "1001644222317",
    appId: "1:1001644222317:web:8fbbfe9cfc5efce3c6dc64",
    measurementId: "G-BYP7632C4B"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
