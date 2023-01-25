import { initializeApp } from "firebase/app";
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default  ({ app }, inject) => {
  const $fire = {
    app: firebaseApp.app,
    auth: firebaseApp.auth,
    firestore: firebaseApp.firestore
  }
  inject('$fire', $fire)
}
