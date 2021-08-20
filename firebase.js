import * as firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyCtKiqmVEw6HO2-5-pg4w8pf96BRMNQL4Y",
    authDomain: "tideflochat.firebaseapp.com",
    projectId: "tideflochat",
    storageBucket: "tideflochat.appspot.com",
    messagingSenderId: "339697476411",
    appId: "1:339697476411:web:ea3db61c775f13aa1a8d1e",
    // measurementId: "G-CMXC7K77D4"
};
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
const database = firebase.database();
export {db, auth, database}