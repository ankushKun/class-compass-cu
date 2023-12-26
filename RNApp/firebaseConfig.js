import { initializeApp } from 'firebase/app'
import firebase from "@react-native-firebase/app"
import * as Config from "./process.env.js"

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
    apiKey: Config.API_KEY,
    authDomain: Config.AUTH_DOMAIN,
    databaseURL: Config.DB_URL,
    projectId: Config.PROJ_ID,
    storageBucket: Config.STORAGE_BUCKET,
    messagingSenderId: Config.MESSAGING_SENDER_ID,
    appId: Config.APP_ID,
    measurmentId: Config.MEASURMENT_ID
}

const fbase = initializeApp(firebaseConfig);
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default fbase;