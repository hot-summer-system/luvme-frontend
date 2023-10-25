// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoeFjVwOSWtSr5bQ7pzZxG4GWKp6S5OZo",
  authDomain: "luv-me-116eb.firebaseapp.com",
  projectId: "luv-me-116eb",
  storageBucket: "luv-me-116eb.appspot.com",
  messagingSenderId: "478792066490",
  appId: "1:478792066490:web:5cbf71e0b4bb7d3654a983",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
