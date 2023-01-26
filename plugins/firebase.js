import { initializeApp } from "firebase/app";

export default  ({ app }, inject) => {
  const firebaseApp = initializeApp({
    apiKey: app.$config.apiKey,
    authDomain: app.$config.authDomain,
    projectId: app.$config.projectId,
    storageBucket: app.$config.storageBucket,
    messagingSenderId: app.$config.messagingSenderId,
    appId: app.$config.appId,
  });

  inject('fire', firebaseApp)
}
