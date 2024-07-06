// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCC1DYEAGQdE2mCMzFGcDgCE-RRY9h2-fU",
  authDomain: "e-commerce-70bc2.firebaseapp.com",
  projectId: "e-commerce-70bc2",
  storageBucket: "e-commerce-70bc2.appspot.com",
  messagingSenderId: "19351654787",
  appId: "1:19351654787:web:a124a9ed4787c5cd7fe6b6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
