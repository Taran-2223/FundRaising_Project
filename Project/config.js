// Firebase Config key Setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA7TfkVacxsIMeoHitAFB0c6gWIbNaMW34",
    authDomain: "fundraiser-d5490.firebaseapp.com",
    projectId: "fundraiser-d5490",
    storageBucket: "fundraiser-d5490.appspot.com",
    messagingSenderId: "470224038489",
    appId: "1:470224038489:web:31a7775d1088f751fd9f48"
}

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};