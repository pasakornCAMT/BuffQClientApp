import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCf0kzKNMSmw3VFGPHbjjSm413VGnBnqL4",
  authDomain: "buffq-ed098.firebaseapp.com",
  databaseURL: "https://buffq-ed098.firebaseio.com",
  projectId: "buffq-ed098",
  storageBucket: "buffq-ed098.appspot.com",
  messagingSenderId: "965380048584"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

//const FirebaseService = firebaseApp.database().ref();
const FirebaseService = firebaseApp

export default FirebaseService;
