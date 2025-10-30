// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase config (replace with your actual credentials from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDPkor76PD3wAXQu42sUYUUrq34WpRoxeA",
  authDomain: "bookit-fce09.firebaseapp.com",
  projectId: "bookit-fce09",
  storageBucket: "bookit-fce09.firebasestorage.app",
  messagingSenderId: "962738322617",
  appId: "1:962738322617:web:f75aaaf0e411da29baaf68"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
