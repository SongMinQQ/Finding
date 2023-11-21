// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2c4TvcuJi6e5kGFHYf-3CVhHqgN8EyWM",
  authDomain: "finding-e15ab.firebaseapp.com",
  projectId: "finding-e15ab",
  storageBucket: "finding-e15ab.appspot.com",
  messagingSenderId: "1072795597185",
  appId: "1:1072795597185:web:c7b92f3ce404cf16b91080",
  measurementId: "G-DX7MTGPNDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);