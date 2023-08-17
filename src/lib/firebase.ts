// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWEjbWtUGWOH8yiqPl8Xk-j0wHTrttQxQ",
  authDomain: "dine-market-b971e.firebaseapp.com",
  projectId: "dine-market-b971e",
  storageBucket: "dine-market-b971e.appspot.com",
  messagingSenderId: "742873206697",
  appId: "1:742873206697:web:c16ae963335b8cff50beb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
