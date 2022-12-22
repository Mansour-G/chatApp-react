// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKx0g26q52TBG88GCvZayoVYA8QqXK1RE",
  authDomain: "chat-app-78b14.firebaseapp.com",
  projectId: "chat-app-78b14",
  storageBucket: "chat-app-78b14.appspot.com",
  messagingSenderId: "405077541937",
  appId: "1:405077541937:web:49c74ca1e7bd2b2c500110",
  measurementId: "G-111766G53L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()



// Create a root reference
export const storage = getStorage();

