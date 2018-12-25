 import firebase from 'firebase';
 import 'firebase/storage';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyACIu44HULPaS6zRYWcFJ_ldVafBDULidI",
    authDomain: "firestorage-ecd43.firebaseapp.com",
    databaseURL: "https://firestorage-ecd43.firebaseio.com",
    projectId: "firestorage-ecd43",
    storageBucket: "firestorage-ecd43.appspot.com",
    messagingSenderId: "28488000905"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }