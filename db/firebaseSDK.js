// Import the functions you need from the SDKs you need

import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDljgf0hK2sMVOxrCU6Q7kRULfxQ7H1EsA",

  authDomain: "tobee-d16e8.firebaseapp.com",

  projectId: "tobee-d16e8",

  storageBucket: "tobee-d16e8.appspot.com",

  messagingSenderId: "304804516021",

  appId: "1:304804516021:web:f7a26c68020558b8fc6efc"

};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
 app = firebase.initializeApp(firebaseConfig);
} else {
 app = firebase.app()
}
const auth = firebase.auth()
export { auth }