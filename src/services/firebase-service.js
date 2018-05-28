import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBIfKV0ndhpJYG20y6MXPmTNOqaVpfpmVs",
  authDomain: "react-native-grocery-bcb32.firebaseapp.com",
  databaseURL: "https://react-native-grocery-bcb32.firebaseio.com",
  projectId: "react-native-grocery-bcb32",
  storageBucket: "react-native-grocery-bcb32.appspot.com",
  messagingSenderId: "98054647551"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const FirebaseService = firebaseApp.database().ref();

export default FirebaseService;
