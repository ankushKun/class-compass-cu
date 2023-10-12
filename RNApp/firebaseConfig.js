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
    apiKey: Config.EXPO_PUBLIC_API_KEY,
    authDomain: Config.EXPO_PUBLIC_AUTH_DOMAIN,
    databaseURL: Config.EXPO_PUBLIC_DB_URL,
    projectId: Config.EXPO_PUBLIC_PROJ_ID,
    storageBucket: Config.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: Config.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: Config.EXPO_PUBLIC_APP_ID,
    measurmentId: Config.EXPO_PUBLIC_MEASURMENT_ID
}

const fbase = initializeApp(firebaseConfig);
if (firebase.apps.length === 0)
    firebase.initializeApp(firebaseConfig)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default fbase;