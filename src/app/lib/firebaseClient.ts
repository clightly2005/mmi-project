
"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";


export function getFirebaseApp(): FirebaseApp {
    if(!getApps().length) {;
    //check app doesn't already exist
    const app = initializeApp({
        //env vars go to .env if want to see
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    });
    return app;
 }
 return getApp();
}

