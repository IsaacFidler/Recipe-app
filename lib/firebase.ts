import firebase from "firebase/app";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

export async function getUserWithUsername(username: any) {
  const usersRef = collection(firestore, "users");
  const query1 = query(usersRef, where("username", "==", username), limit(1));

  const userDoc = (await getDocs(query1)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);
export const storage = getStorage(app);
