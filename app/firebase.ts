import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApK-ZP7ifaWcY6pRuTCRqpu5AufUqXEmI",
  authDomain: "cnt-keys.firebaseapp.com",
  projectId: "cnt-keys",
  storageBucket: "cnt-keys.appspot.com",
  messagingSenderId: "45587695935",
  appId: "1:45587695935:web:5ee5e2d6d06aa2afbf6b8a",
  measurementId: "G-WXV0E1PLCZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
