import { initializeApp, getApps, cert, App } from "firebase-admin/app";
//this verifies tokens and reads user info so is backend firebase but normal FB SDK is front end as client

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
    //uses this to contact firebase securely and firebase will confirm if it issues a token or not 
);

export const adminApp: App = getApps().length === 0 ? initializeApp({
    credential: cert(serviceAccount),
}) : getApps()[0];