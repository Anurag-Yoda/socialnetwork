import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBG-06u9cgMTquvFRVF36aWqPPZ-_PBIPI",
    authDomain: "events-social-react.firebaseapp.com",
    databaseURL: "https://events-social-react.firebaseio.com",
    projectId: "events-social-react",
    storageBucket: "events-social-react.appspot.com",
    messagingSenderId: "479524891098",
    appId: "1:479524891098:web:3ad76cc9335624635ff8e3"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;