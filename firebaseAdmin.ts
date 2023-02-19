import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

// const serviceAccount = require("./serviceAccountKey.json");

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// with this code we can make admin calls from backend to manipulate the db
// with zero permissions. So we need to keep admin key confidential and
// be cautious with it

if(!getApps().length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const adminDb = admin.firestore();

export {adminDb};