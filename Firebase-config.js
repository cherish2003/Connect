// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhmOSNYGD3dDu9TbEar-uY-ah8eh2ff6I",
  authDomain: "chat-web-application-13f8e.firebaseapp.com",
  projectId: "chat-web-application-13f8e",
  storageBucket: "chat-web-application-13f8e.appspot.com",
  messagingSenderId: "732523816886",
  appId: "1:732523816886:web:9faf22fabf2a992f640317",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
