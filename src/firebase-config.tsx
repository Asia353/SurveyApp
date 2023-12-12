// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe68STxm-nchFFiHKiwyASzGq5_t28cEM",
  authDomain: "surveyapp-4cf37.firebaseapp.com",
  projectId: "surveyapp-4cf37",
  storageBucket: "surveyapp-4cf37.appspot.com",
  messagingSenderId: "999566653445",
  appId: "1:999566653445:web:34e3a973d4793721fe046c",
  measurementId: "G-VP3M5SXW7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;
export const database = getFirestore(app);
