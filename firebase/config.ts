import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
export const db = getFirestore(app);
export const storege = getStorage(app);
export async function DeleteDocitem(path: any, itemid: any) {
  const docref = await deleteDoc(doc(db, path, itemid));
  console.log(docref);
  return "Document was deleted!";
}
