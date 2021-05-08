import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAs1RgH6bFt0do5ed2yaGW3tZ_JQVHm4JM",
    authDomain: "rastreador-gps-mc.firebaseapp.com",
    databaseURL: "https://rastreador-gps-mc-default-rtdb.firebaseio.com",
    projectId: "rastreador-gps-mc",
    storageBucket: "rastreador-gps-mc.appspot.com",
    messagingSenderId: "206108616211",
    appId: "1:206108616211:web:cb1311d7efa5abf36301e6"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;