"use client";
import { getFirebaseApp } from "./firebaseClient";
import { getFirestore } from "firebase/firestore";

export function getDb() {
    return getFirestore(getFirebaseApp());
}