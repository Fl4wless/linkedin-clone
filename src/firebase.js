import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCwLAAdup7c0RZIgChsdTaheNyAWcj_OBk",
    authDomain: "linkedin-854cb.firebaseapp.com",
    projectId: "linkedin-854cb",
    storageBucket: "linkedin-854cb.appspot.com",
    messagingSenderId: "167624293535",
    appId: "1:167624293535:web:ef3dcf6be6446079dbf6aa",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };