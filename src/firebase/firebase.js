import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4k6b1B9fVCMObg7K7NQxy_gnwapuvoG0",
  authDomain: "swara-3cdc2.firebaseapp.com",
  projectId: "swara-3cdc2",
  storageBucket: "swara-3cdc2.appspot.com",
  messagingSenderId: "525488572711",
  appId: "1:525488572711:web:7f68f2e6a2f89c34fc8102",
  measurementId: "G-Z6FSRP7212",
};

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { app, storage };
const analytics = getAnalytics(app);
