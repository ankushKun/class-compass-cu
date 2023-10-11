import { initializeApp } from 'firebase/app'
import firebase from "@react-native-firebase/app"
import * as config from process.env.DB_ENV

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    databaseURL: config.DB_URL,
    projectId: config.PROJ_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurmentId: config.MEASURMENT_ID
};

const fbase = initializeApp(firebaseConfig);
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default fbase;