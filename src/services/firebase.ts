import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7RnfXQOzXAk00yNx4euov6neR3uoeQXU",
  authDomain: "gymnastic-aa4a1.firebaseapp.com",
  databaseURL: "https://gymnastic-aa4a1-default-rtdb.firebaseio.com",
  projectId: "gymnastic-aa4a1",
  storageBucket: "gymnastic-aa4a1.appspot.com",
  messagingSenderId: "68510570163",
  appId: "1:68510570163:web:b2d70814d5ef5d53d342c6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Notificação
// export const messaging = getMessaging(app);

// Database
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);
