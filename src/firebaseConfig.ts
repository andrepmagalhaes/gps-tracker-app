import firebase from 'firebase';
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "rastreador-gps-mc.firebaseapp.com",
    databaseURL: "https://rastreador-gps-mc-default-rtdb.firebaseio.com",
    projectId: "rastreador-gps-mc",
    storageBucket: "rastreador-gps-mc.appspot.com",
    messagingSenderId: "206108616211",
    appId: "1:206108616211:web:cb1311d7efa5abf36301e6"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;