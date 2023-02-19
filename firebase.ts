import { initializeApp, getApp, getApps} from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYy1mFmG7mKCz8LRjFV9UCjdHQ59OyCDg",
  authDomain: "chatgpt-messenger-49410.firebaseapp.com",
  projectId: "chatgpt-messenger-49410",
  storageBucket: "chatgpt-messenger-49410.appspot.com",
  messagingSenderId: "491915894621",
  appId: "1:491915894621:web:41df9398fcf301658492b4"
};

// Initialize Firebase
// getApps() will get all apps, if an app is present then use that one
// else create a new one. This is called 'Singleton Pattern Encoding'
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// get db from app
const db = getFirestore(app);

export {db};