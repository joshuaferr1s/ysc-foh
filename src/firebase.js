import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  appId: import.meta.env.VITE_FB_APP_ID,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
