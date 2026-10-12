import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnVG2dqAJF5CPviX1oDFoafNc6fX1pPqQ",
  authDomain: "goaltree-431ba.firebaseapp.com",
  projectId: "goaltree-431ba",
  storageBucket: "goaltree-431ba.firebasestorage.app",
  messagingSenderId: "220790839725",
  appId: "1:220790839725:web:9da720b52b89de0f1e2924",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
