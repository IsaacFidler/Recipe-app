import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCKwK2ZGZ8lHohfh6BOGs9XC8vXxFGAdo",
  authDomain: "nextfire-bccfd.firebaseapp.com",
  projectId: "nextfire-bccfd",
  storageBucket: "nextfire-bccfd.appspot.com",
  messagingSenderId: "183357329937",
  appId: "1:183357329937:web:472dfc8c38452621e497b0",
  measurementId: "G-RGKBH30R78",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
