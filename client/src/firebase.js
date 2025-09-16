import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-d3c1f.firebaseapp.com",
  projectId: "mern-state-d3c1f",
  storageBucket: "mern-state-d3c1f.firebasestorage.app",
  messagingSenderId: "354752213965",
  appId: "1:354752213965:web:c923b4270171eb705a8a84"
};


export const app = initializeApp(firebaseConfig);